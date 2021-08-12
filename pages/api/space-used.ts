import { createHandlers } from '../../lib/restUtils';
import { FileModel } from '../../lib/models/fileModel'
import { getSession } from '../../lib/cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = await getSession(req)
    const model = new FileModel(token)
    const spaceUsed = await model.getUserSpaceUsed()
    res.status(200).json({ spaceUsed })
  },
}

export default function spaceUsed(req: NextApiRequest, res: NextApiResponse) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}