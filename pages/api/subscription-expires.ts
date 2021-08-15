import { createHandlers } from '../../lib/restUtils';
import { UserModel } from '../../lib/models/userModel'
import { getSession } from '../../lib/cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = await getSession(req)
    const model = new UserModel()
    const subscriptionExpires = await model.getUserSubscriptionExpiration(token)

    res.status(200).json({ subscriptionExpires })
  },
}

export default function spaceUsed(req: NextApiRequest, res: NextApiResponse) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}