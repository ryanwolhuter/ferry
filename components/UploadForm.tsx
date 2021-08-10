
import { useState, ChangeEvent, FormEvent } from 'react'
import makeStorageClient from '../lib/storageClient'
import { getFileName, makeFileUrl } from '../lib/fileUpload'
import sendEmail from '../lib/sendEmail'
import Spinner from './Spinner'

export default function UploadForm({ mutateUploads }) {
  const [files, setFiles] = useState<File[]>([])
  const [rootCid, setRootCid] = useState('')
  const [percentUploaded, setPercentUploaded] = useState('0%')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function storeWithProgress(files: File[]) {
    try {
      setIsLoading(true)

      const client = makeStorageClient()

      const totalSize = files
        .map(f => f.size)
        .reduce((a, b) => a + b)

      let uploaded = 0
    
      const onStoredChunk = (size: number) => {
        uploaded += size
        const percentUploaded = `${Math.round(uploaded / totalSize * 100)}%`
        setPercentUploaded(percentUploaded)
      }

      const onRootCidReady = (rootCid: string) => {
        setRootCid(rootCid)
      }
    
      const cid = await client.put(files, { onRootCidReady, onStoredChunk })
      return cid
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  function handleChooseFile(inputEvent: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(inputEvent?.target?.files ?? [])
    setFiles(files)
  }

  async function handleSubmit(submitEvent: FormEvent) {
    submitEvent.preventDefault()

    const cid = await storeWithProgress(files)

    if (!email || !cid) return

    const name = getFileName(files)

    mutateUploads(currentUploads => [...currentUploads, { data: { name, cid }}], false)

    await fetch('/api/files', {
      method: 'POST',
      body: JSON.stringify({ name, cid })
    })

    const fileUrl = makeFileUrl(cid, files)
    sendEmail(email, fileUrl)
  }

  return (
    <>
      {isLoading 
        ? <Spinner />
        : <form onSubmit={e => handleSubmit(e)}>
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
              <input 
                type="text" 
                name="email" 
                onChange={e => setEmail(e.target.value)}
              ></input>
            </label>
            <button 
              type="submit" 
              disabled={files.length === 0}
            >Submit
            </button>
            { rootCid ? (
              <>
                {/* <div>Percent uploaded: {percentUploaded}</div> */}
                <div>Direct <a href={makeFileUrl(rootCid, files)}>download</a></div>
              </>
            ) : <div></div>}
        </form>  
      }
    </>
)
}