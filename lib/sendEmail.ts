import axios from 'axios'

export default async function sendEmail(email: string, url: string, sender: string) {
  await axios.post('/api/send-mail', {
    email,
    url,
    sender
  })
}