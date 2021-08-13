export type Mutator = (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>

export type Upload = {
  data: {
    name: string,
    cid: string,
    size: number,
    expiration: number
  }
}