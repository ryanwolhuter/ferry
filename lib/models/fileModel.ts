import { Client, Map, Paginate, Match, Index, Ref, Collection, Lambda, Get, Var, Identity, CurrentIdentity, Create, Call, Function, Delete } from 'faunadb'
import { getClient } from '../faunadb'

export class FileModel {
  client: Client

  constructor(token: string) {
    this.client = getClient(token)
  }

  async getAllFiles() {
    return this.client.query(
      Map(
        Paginate(
          Match(
            Index('all_files_by_user'), 
            CurrentIdentity())),
        Lambda('fileRef', Get(Var('fileRef'))))
    )
      // TODO figure out type for response
      .then((res: any) => res.data)
  }

  async getUserSpaceUsed() {
    return this.client.query(
      Call(Function('getUserSpaceUsed'), CurrentIdentity())
    )
    .then((res: any) => res.spaceUsed.data[0])
  }

  async addFile(name: string, cid: string, size: number, expiration = 12) {
    const expirationInMilliseconds = expiration * 60 * 60 * 100
    const timestamp = Date.now()

    try {
      const res = await this.client.query(
        Create(
          Collection('files'),
          {
            data: {
              name,
              cid,
              size,
              user: CurrentIdentity(),
              expiration: timestamp + expirationInMilliseconds
            }
          }
        )
      )

      // @ts-ignore
      return res.ref.id
    } catch (error) {
      console.error(error)
    }
  }

  async deleteFile(id: string) {
    try {
      return await this.client.query(
        Delete(Ref(Collection('files'), id))
      )
    } catch (error) {
      console.error(error)
    }
  }
}