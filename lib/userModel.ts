import { q, adminClient, getClient } from './faunadb'

export class UserModel {
  async createUser(email: string) {
    return adminClient.query(q.Create(q.Collection('users'), {
      data: { email }
    }))
  }

  async getUserByEmail(email) {

  }

  async obtainFaunaDBToken(user) {

  }

  async invalidateFaunaDBToken(token) {

  }
}