import { serialize, parse } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { encrypt, decrypt } from './iron'

const TOKEN_NAME = 'session'
const MAX_AGE = 60 * 60 * 8 // 8 hours

function parseCookies(req: NextApiRequest) {
  // for api routes, we don't need to parse the cookies
  if (req.cookies) return req.cookies

  // for pages, we do need to parse the cookies
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export async function createSession(res: NextApiResponse, data) {
  const encryptedToken = await encrypt(data)

  const cookie = serialize(TOKEN_NAME, encryptedToken, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
  })

  res.setHeader('Set-Cookie', cookie)
}

export async function getSession(req: NextApiRequest) {
  const cookies = parseCookies(req)
  return decrypt(cookies?.[TOKEN_NAME])
}

export function removeSession(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/'
  })

  res.setHeader('Set-Cookie', cookie)
}