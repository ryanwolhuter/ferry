import { NextApiRequest, NextApiResponse } from "next"
import { Magic } from '@magic-sdk/admin'
import Iron from '@hapi/iron'
import CookieService from '../../lib/cookie.ts'

let magic = new Magic(process.env.MAGIC_SECRET_KEY)

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  // exchange the DID from Magic for some user data
  const did = magic.utils.parseAuthorizationHeader(req.headers.authorization)
  const user = await magic.users.getMetadataByToken(did)

  // TODO Author a couple of cookies to persist a user's session
  res.end()
}