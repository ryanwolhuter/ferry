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
        <li key={name}>
          <p>name: {name}</p>
          <p>cid: {cid}</p>
        </li>
      ))}
    </ul>
  )
}