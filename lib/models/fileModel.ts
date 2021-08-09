import { Client, Map, Paginate, Match, Index, Ref, Collection, Lambda, Get, Var, CurrentIdentity } from 'faunadb'
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
            Ref(Collection('users'), "306365774328496652"))),
        Lambda('fileRef', Get(Var('fileRef'))))
    )
    // TODO figure out type for response
    .then((res: any) => res.data)
  }
}