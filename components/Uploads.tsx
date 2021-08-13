import Link from 'next/link'

export default function Uploads({ files, mutateUploads, mutateSpaceUsed }: any) {
  const uploads = files.map(f => {
    return {
      ...f.ref?.['@ref'],
      ...f.data
    }
  })

  async function handleDeleteFile(cid, faunaId, size) {
    // TODO implement delete on web3.storage when it is implemented
    // in the javascript client

    mutateUploads(currentUploads =>
      currentUploads.filter(
        upload => upload?.data?.cid !== cid),
      false)
    mutateSpaceUsed(currentSpaceUsed =>
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