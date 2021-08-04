
import axios from 'axios'
import { useState, ChangeEvent, FormEvent } from 'react'
import makeStorageClient from './lib/storageClient'

export default function UploadForm() {
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const [rootCid, setRootCid] = useState('')
  const [percentUploaded, setPercentUploaded] = useState('0%')
  const [email, setEmail] = useState('')

  async function storeWithProgress(files: File[]) {

    const onRootCidReady = (rootCid: string) => {
      setRootCid(rootCid)
    }
  
    const totalSize = 
      files
      .map(f => f.size)
      .reduce((a, b) => a + b)

    let uploaded = 0
  
    const onStoredChunk = (size: number) => {
      uploaded += size
      const percentUploaded = `${Math.round(uploaded / totalSize * 100)}%`
      setPercentUploaded(percentUploaded)
    }
  
    const client = makeStorageClient()

    return client.put(files, { onRootCidReady, onStoredChunk })
  }
  
  function handleChooseFile(inputEvent: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(inputEvent?.target?.files ?? [])
    setFiles(files)

    setIsUploadButtonDisabled(false)
  }

  async function handleSubmit(submitEvent: FormEvent) {
    submitEvent.preventDefault()

    const cid = await storeWithProgress(files)

    await axios.post('/api/send-mail', {
      email,
      url: makeFileUrl(cid, files)
    })
  }

  function getFileName(files: File[]) {
    if (!files) return 'no file yet buddy'
    return files?.[0]?.name
  }

  function makeFileUrl(rootCid: string, files: File[]) {
    return `https://${rootCid}.ipfs.dweb.link/${getFileName(files)}`
  }

  return (
  <form onSubmit={e => handleSubmit(e)}>
      <label htmlFor="fileInput">
        Choose file
        <input 
          type="file" 
          name="fileInput" 
          onChange={e => handleChooseFile(e)}
        ></input>
      </label>
      <label htmlFor="email">
        Receiver email
        <input type="text" name="email" onChange={e => setEmail(e.target.value)}></input>
      </label>
      <button type="submit" disabled={isUploadButtonDisabled}>Submit</button>
      {/* <div>Percent uploaded: {percentUploaded}</div> */}
      { rootCid ? (
        <div>Direct <a href={makeFileUrl(rootCid, files)}>download</a></div>
      ) : <div></div>}
  </form>
  )
}