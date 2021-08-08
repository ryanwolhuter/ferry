import faunadb from 'faunadb'

/** Shortcut to fauna's query function */
export const q = faunadb.query

/** Creates an authenticated faunadb client
 * configured with the given `secret`
 */
export function getClient(secret: string) {
  return new faunadb.Client({ secret })
}

/** Faunadb `Client` configured with vercel fauna admin key */
export const adminClient = getClient(process.env.FAUNA_ADMIN_KEY)