import Link from 'next/link'
import prettyBytes from 'pretty-bytes'
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
    //     <table>
    //     <thead>
    //         <tr>
    //             <th colspan="2">The table header</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         <tr>
    //             <td>The table body</td>
    //             <td>with two columns</td>
    //         </tr>
    //     </tbody>
    // </table>
    <table>
      <thead>
        <tr>
          <th>File Name</th>
          <th>File Size</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
        {uploads.map(({ name, cid, id: faunaId, size, expiration }) => (
          <tr key={cid + Math.random()}>
            <td>
              <Link href={`https://${cid}.ipfs.dweb.link/${name}`}>
                <a>{name}</a>
              </Link>
            </td>
            <td>{prettyBytes(size)}</td>
            <td>{(new Date(expiration).toLocaleTimeString())}</td>
          </tr>
        ))}
      </tbody>
      <style jsx>{`
        a {
          text-decoration: none;
        }

        td {
          padding: 16px;
        }
        `}</style>
    </table>
  )
}