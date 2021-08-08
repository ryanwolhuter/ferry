import { q, adminClient, getClient } from './faunadb'

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

  }

  async invalidateFaunaDBToken(token) {

  }
}