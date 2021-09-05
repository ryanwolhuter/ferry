export default async function sendEmail(email: string, url: string, sender: string) {
  await fetch(
    '/api/send-mail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, url, sender
    })
  }
)
}