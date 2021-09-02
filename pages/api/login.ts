import { NextApiRequest, NextApiResponse } from 'next'
import { Magic } from '@magic-sdk/admin'
import { createSession } from '../../lib/cookie'
import { createHandlers } from '../../lib/restUtils'
import { UserModel } from '../../lib/models/userModel'

const handlers = {
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    // validate the users did token
    const magic = new Magic(process.env.MAGIC_SECRET_KEY)
    const didToken = magic.utils.parseAuthorizationHeader(req.headers.authorization ?? 'NO AUTH HEADER')
    const { email, issuer } = await magic.users.getMetadataByToken(didToken)

    if (!email || !issuer) return

    // get or create a user's entity in faunadb
    const userModel = new UserModel()

    // auto-detect signups if `getUserByEmail` is null
    const user = await userModel.getUserByEmail(email)
      ?? await userModel.createUser(email)
    const token = await userModel.obtainFaunaDBToken(user)

    // create session cookie with the user's verified information
    await createSession(res, { token, email, issuer })

    res.status(200).send({ done: true })
  }
}

export default function login(req: NextApiRequest, res: NextApiResponse) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}