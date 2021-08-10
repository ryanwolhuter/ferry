import { getSession, removeSession } from "../../lib/cookie";
import { createHandlers } from "../../lib/restUtils";
import { UserModel } from "../../lib/models/userModel";
import { Magic } from "@magic-sdk/admin";
import { NextApiRequest, NextApiResponse } from "next";

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const { token, issuer } = await getSession(req)
    
    const magic = new Magic(process.env.MAGIC_SECRET_KEY)
    const userModel = new UserModel()
    
    await Promise.all([
      userModel.invalidateFaunaDBToken(token),
      magic.users.logoutByIssuer(issuer)
    ])
    removeSession(res)
    res.writeHead(302, { Location: '/' })
    res.end()
  }
}

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  const handler = createHandlers(handlers)
  return handler(req, res)
}