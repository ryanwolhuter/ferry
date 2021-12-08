import Link from 'next/link'
import prettyBytes from 'pretty-bytes'
import styled from 'styled-components'
import { useFiles } from '../lib/hooks'

const Table = styled.table`
  border-radius: 20px 20px 0px 0px;
  padding-bottom: 32px;
  border-collapse: collapse;
`
const THead = styled.thead`
    border-radius: 20px;
    height: 72px;
    box-shadow: 0px 0px 33px rgba(57, 29, 118, 0.18);
    border-radius: 20px 20px 0px 0px;
    padding: 24px;
`

const TBody = styled.tbody``

const TR = styled.tr`
    &:nth-child(even) {
          background: white;
        }

    &:nth-child(odd) {
      background: linear-gradient(90deg, #fcf8ff 39.37%, #fff9eb 100%);
    }
`

const TH = styled.th`
    text-align: start;
    padding: 8px;
    border-radius: 20px;

  &:first-child {
        padding-left: 24px;
      }
`

const TD = styled.td`
    min-width: 150px;
    padding: 8px;
`

const A = styled.a`
    text-decoration: none;
    `

export default function Uploads() {

  const { files } = useFiles()

  const uploads = files?.map(f => {
    return {
      ...f.ref?.['@ref'],
      ...f.data
    }
  })

  // async function handleDeleteFile(cid: string, faunaId: string, size: number) {
  //   // TODO implement delete on web3.storage when it is implemented
  //   // in the javascript client

  //   mutateFiles((currentUploads: Upload[]) =>
  //     currentUploads.filter(
  //       upload => upload?.data?.cid !== cid),
  //     false)
  //   mutateSpaceUsed((currentSpaceUsed: number) =>
  //     currentSpaceUsed - size,
  //     false)

  //   await fetch('/api/files', {
  //     method: 'DELETE',
  //     body: JSON.stringify({ id: faunaId })
  //   })
  // }

  return (
    <Table>
      <THead>
        <TR>
          <TH>File Name</TH>
          <TH>File Size</TH>
          <TH>Expiry Date</TH>
        </TR>
      </THead>
      <TBody>
        {uploads.map(({ name, cid, size, expiration }) => (
          <TR key={cid + Math.random()}>
            <TD>
              <Link href={`https://${cid}.ipfs.dweb.link/${name} `} passHref>
                <A>{name}</A>
              </Link>
            </TD>
            <TD>{prettyBytes(size)}</TD>
            <TD>{(new Date(expiration).toLocaleTimeString())}</TD>
          </TR>
        ))}
      </TBody>
    </Table>
  )
}