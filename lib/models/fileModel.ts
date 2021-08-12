import { Client, Map, Paginate, Match, Index, Ref, Collection, Lambda, Get, Var, Identity, CurrentIdentity, Create, Call, Function } from 'faunadb'
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
    .then((res: any) => res.spaceUsed.data)
  }

  async addFile(name: string, cid: string, size: number) {
    try {
      const res = await this.client.query(
        Create(
          Collection('files'),
          {
            data: {
              name,
              cid,
              size,
              user: CurrentIdentity()
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
}