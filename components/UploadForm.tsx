
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import makeStorageClient from '../lib/storageClient'
import { getFileName, getFileSize, makeFileUrl } from '../lib/fileUpload'
import sendEmail from '../lib/sendEmail'
import Progress from './Progress'
import styles from '../styles/UploadForm.module.css'
import { oneGigabyte, freeMemberSpaceAllowance } from '../constants/space'
import prettyBytes from 'pretty-bytes'

export default function UploadForm({ spaceUsed, mutateSpaceUsed, mutateUploads }) {
  const [files, setFiles] = useState<File[]>([])
  const [rootCid, setRootCid] = useState('')
  const [percentUploaded, setPercentUploaded] = useState(10)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fileSize, setFileSize] = useState('')
  const [fileName, setFileName] = useState('')

  function getRemainingSpace() {
    return freeMemberSpaceAllowance - spaceUsed
  }

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
        const percentUploaded = Math.round(uploaded / totalSize * 100)
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
    if (!files.length) return

    const name = getFileName(files)
    const size = getFileSize(files)
    setFileName(name)
    setFileSize(prettyBytes(size))
  }

  async function handleSubmit(submitEvent: FormEvent) {
    submitEvent.preventDefault()

    const cid = await storeWithProgress(files)

    if (!cid) return

    const name = getFileName(files)
    const size = getFileSize(files)
    const expiration = Date.now()

    mutateUploads(currentUploads => [...currentUploads, { data: { name, cid, size, expiration } }], false)
    mutateSpaceUsed(currentSpaceUsed => currentSpaceUsed + size, false)

    await fetch('/api/files', {
      method: 'POST',
      body: JSON.stringify({ name, cid, size })
    })

    if (!email) return

    const fileUrl = makeFileUrl(cid, files)
    sendEmail(email, fileUrl)
  }

  return (
    <>
      {isLoading
        ? <Progress progress={percentUploaded} radius={100} stroke={10} />
        : <form onSubmit={e => handleSubmit(e)} className={styles.form}>
          <div>Space used: {prettyBytes(spaceUsed)}/2 GB</div>
          <div className="file-input">
            <input
              type="file"
              name="file"
              onChange={e => handleChooseFile(e)}
            ></input>
            <label htmlFor="file" aria-hidden={true}>
              Choose file
            </label>
            {fileName}
            {fileSize}
          </div>
          <label htmlFor="email">
            Receiver email
          </label>
          <input
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
          ></input>
          <button
            type="submit"
            className="default"
            disabled={files.length === 0}
          >Submit
          </button>
          {rootCid ? (
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