
import { useState, ChangeEvent, FormEvent } from 'react'
import { Web3Storage } from 'web3.storage'
import axios from 'axios'

export default function UploadForm() {
  function makeStorageClient() {
    const token = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN ?? ''
    return new Web3Storage({ token })
  }
  function handleInput(inputEvent: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(inputEvent?.target?.files ?? [])
    setFiles(files)
    setFileName(files?.[0]?.name)
    setFileUrl(`https://${rootCid}.ipfs.dweb.link/${fileName}`)
    setIsUploadButtonDisabled(false)
  }
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const [fileName, setFileName] = useState('')
  const [fileUrl, setFileUrl] = useState('')
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
  async function handleSubmit(submitEvent: FormEvent) {
    submitEvent.preventDefault()

    await storeWithProgress(files)

    axios.post('/api/send-mail', {
      email,
      url: fileUrl
    })
  }
  return (
  <form onSubmit={e => handleSubmit(e)}>
      <input 
      type="file" 
      name="fileInput" 
      onChange={e => handleInput(e)}></input>
      <input type="text" name="email" onChange={e => setEmail(e.target.value)}></input>
      <button type="submit" disabled={isUploadButtonDisabled}>Submit</button>
      <div>Percent uploaded: {percentUploaded}</div>
      <div>Result: https://dweb.link/ipfs/{rootCid}</div>
      <div>Direct <a download={fileName} href={`https://${rootCid}.ipfs.dweb.link/${fileName}`}>download</a></div>
  </form>
  )
}