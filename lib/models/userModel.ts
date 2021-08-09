import { q, adminClient, getClient } from '../faunadb'

export class UserModel {
  async createUser(email: string) {
    return adminClient
      .query(
        q.Create(
          q.Collection('users'), {
          data: { email }
        }))
  }

  async getUserByEmail(email: string) {
    return adminClient
      .query(
        q.Get(
          q.Match(
            q.Index('users_by_email'), email))
      ).catch(() => null)
  }

  async obtainFaunaDBToken(user) {
    return adminClient
      .query(
        q.Create(
          q.Tokens(),
          { instance: q.Select('ref', user) }
        )
      )
      // TODO figure out the type for this response
      // @ts-ignore
      .then(res => res?.secret)
      .catch(() => undefined)
  }

  async invalidateFaunaDBToken(token) {
    await getClient(token)
      .query(
        // invalidates the user's FaunaDB session and burns any associated access tokens
        q.Logout(true)
      )
  }
}