import axios from 'axios'

export default async function sendEmail(email: string, url: string) {
  await axios.post('/api/send-mail', {
    email,
    url
  })
}