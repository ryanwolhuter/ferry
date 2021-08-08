import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../../lib/cookie";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  
  const session = await getSession(req)

  if (session) {
    const { email, issuer } = session
    res.status(200).json({ user: { email, issuer }})
  } else {
    res.status(200).json({ user: null })
  }
}