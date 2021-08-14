import { Create, Index, Logout, Select, Tokens, Get, Match, Collection, Update, CurrentIdentity, Function, Call } from 'faunadb'
import { adminClient, getClient } from '../faunadb'
export class UserModel {
  async createUser(email: string | null) {
    return adminClient
      .query(
        Create(
          Collection('users'), {
          data: { email }
        }))
  }

  async getUserByEmail(email: string | null) {
    if (!email) return null

    return adminClient
      .query(
        Get(
          Match(
            Index('users_by_email'), email))
      ).catch(() => null)
  }

  async subscribeUser(token: string, expiration: number) {
    return await getClient(token)
      .query(
        Call(
          Function('updateUserSubscriptionExpiration'),
          [CurrentIdentity(), expiration]
        )
      )
  }

  async obtainFaunaDBToken(user: object | null) {
    if (!user) return null

    return adminClient
      .query(
        Create(
          Tokens(),
          { instance: Select('ref', user) }
        )
      )
      // TODO figure out the type for this response
      // @ts-ignore
      .then(res => res?.secret)
      .catch(() => null)
  }

  async invalidateFaunaDBToken(token: string) {
    await getClient(token)
      .query(
        // invalidates the user's FaunaDB session and burns any associated access tokens
        Logout(true)
      )
  }
}