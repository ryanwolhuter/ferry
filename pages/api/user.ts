import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '../../lib/cookie'
import { UserModel } from '../../lib/models/userModel'
import { createHandlers } from '../../lib/restUtils'

const handlers = {
  GET: async function (req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession(req)

    if (session) {
      const { email, issuer } = session
      res.status(200).json({ user: { email, issuer }})
    } else {
      res.status(200).json({ user: null })
    }
  },
  POST: async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const { token } = await getSession(req)
      const { expiration } = JSON.parse(req.body)
      const userModel = new UserModel()
      const result = await userModel.subscribeUser(token, expiration)
      res.status(200).json({ result })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error })
    }
  }
}

export default function users(req: NextApiRequest, res: NextApiResponse) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}