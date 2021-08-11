import { createHandlers } from "../../lib/restUtils";
import { FileModel } from '../../lib/models/fileModel'
import { getSession } from "../../lib/cookie";
import { NextApiRequest, NextApiResponse } from "next";

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = await getSession(req)
    const model = new FileModel(token)
    const files = await model.getAllFiles()
    res.status(200).json({ files })
  },
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { token } = await getSession(req)
      const { name, cid, size } = JSON.parse(req.body)
      const fileModel = new FileModel(token)
      const id = await fileModel.addFile(name, cid, size)
      res.status(200).json({ id })
    } catch (error) {
      console.error(error)
    }
  }
}

export default function files(req: NextApiRequest, res: NextApiResponse) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}