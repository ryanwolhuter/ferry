import { makeFileUrl } from "../lib/fileUpload"
import Link from 'next/link'

export type Upload = {
  name: string,
  cid: string,
  user: string
}

type UploadsProps = {
  uploads: Upload[]
}

export default function Uploads({ uploads }: UploadsProps) {
  return (
    <ul>
      {uploads.map(({ name, cid }) => (
        <li key={cid}>
          <Link href={`https://${cid}.ipfs.dweb.link/${name}`}>
            <a>{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}