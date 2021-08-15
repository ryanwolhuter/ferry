// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

type Data = {
  success: boolean,
  msg: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')
  console.log(req.body)
  const sender = req?.body?.sender
  const to = req?.body?.email
  const fileUrl = req?.body?.url
  const html = `
  <p>${sender}</p>
  <h1>Ferried a file to you!</h1>
  <p>Check out what you got by following this link</p>
  <p>Download link <a href="${fileUrl}">${fileUrl}</a></p>
  `
  const msg = {
    to,
    from: 'dev@ryanwolhuter.com',
    subject: `${sender} Ferried a file to you!`,
    text: `${sender} Ferried a file to you!`,
    html
  }
  try {
    console.log(msg)
    await sgMail.send(msg)
    res.status(200).json({ success: true, msg })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, msg: error })
  }
}
