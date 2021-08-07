export default async function login(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // TODO exchange the DID from Magic for some user data

  // TODO Author a couple of cookies to persist a user's session
  res.end()
}