import Link from 'next/link'
import { Mutator, Upload } from '../lib'

type UploadsProps = {
  files: any[],
  mutateUploads: Mutator,
  mutateSpaceUsed: Mutator
}

export default function Uploads(
  { files, mutateUploads, mutateSpaceUsed }: UploadsProps
) {
  const uploads = files.map(f => {
    return {
      ...f.ref?.['@ref'],
      ...f.data
    }
  })

  async function handleDeleteFile(cid: string, faunaId: string, size: number) {
    // TODO implement delete on web3.storage when it is implemented
    // in the javascript client

    mutateUploads((currentUploads: Upload[]) =>
      currentUploads.filter(
        upload => upload?.data?.cid !== cid),
      false)
    mutateSpaceUsed((currentSpaceUsed: number) =>
      currentSpaceUsed - size,
      false)

    await fetch('/api/files', {
      method: 'DELETE',
      body: JSON.stringify({ id: faunaId })
    })
  }

  return (
    <ul>
      {uploads.map(({ name, cid, id: faunaId, size, expiration }) => (
        <li key={cid}>
          <Link href={`https://${cid}.ipfs.dweb.link/${name}`}>
            <a>{name}</a>
          </Link>
          <br />
          <a onClick={e => handleDeleteFile(cid, faunaId, size)}>delete</a>
          <br />
          <span>Expires {(new Date(expiration).toLocaleTimeString())}</span>
        </li>
      ))}
    </ul>
  )
}