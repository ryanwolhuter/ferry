import { Web3Storage } from 'web3.storage'

export default function makeStorageClient() {
  const token = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN ?? ''
  return new Web3Storage({ token })
}