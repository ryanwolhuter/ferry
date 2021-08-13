import { makeFileUrl } from "../lib/fileUpload"
import Link from 'next/link'

// type Upload = {
//   name: string,
//   cid: string,
//   user: string
// }

// type Props = {
//   files: {
//     data: Upload[]
//     ref: object
//   }
// }

export default function Uploads({ files }: any) {
  const uploads = files.map(f => {
    return {
      ...f.ref,
      ...f.data
    }
  })

  return (
    <ul>
      {uploads.map(({ name, cid }) => (
        <li key={cid + Math.random()}>
          <Link href={`https://${cid}.ipfs.dweb.link/${name}`}>
            <a>{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}