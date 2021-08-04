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
  const to = req?.body?.email
  const fileUrl = req?.body?.url
  const html = `
  <p>Someone sent you a file</p>
  <p>Download it <a href="${fileUrl}">here</a></p>
  `
  const msg = {
    to,
    from: 'dev@ryanwolhuter.com',
    subject: 'Taam to daanload your faals',
    text: 'Someone sent you a file',
    html
  }
  try {
    await sgMail.send(msg)
    res.status(200).json({ success: true, msg })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}
