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
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'dev@ryanwolhuter.com', // Change to your recipient
    from: 'dev@ryanwolhuter.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  try {
    await sgMail.send(msg)
    res.status(200).json({ success: true, msg })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}
