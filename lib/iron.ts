import Iron from '@hapi/iron'

export async function encrypt(data: {
  token: string,
  email: string,
  issuer: string
}) {
  if (!data) return

  return Iron.seal(data, process.env.ENCRYPTION_SECRET as string, Iron.defaults)
}

export async function decrypt(data: string) {
  if (!data) return

  return Iron.unseal(data, process.env.ENCRYPTION_SECRET as string, Iron.defaults)
}