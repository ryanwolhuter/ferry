import Iron from '@hapi/iron'

export async function encrypt(data) {
  if (!data) return

  return Iron.seal(data, process.env.ENCRYPTION_SECRET, Iron.defaults)
}

export async function decrypt(data) {
  if (!data) return

  return Iron.unseal(data, process.env.ENCRYPTION_SECRET, Iron.defaults)
}