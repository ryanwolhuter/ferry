
import { useState, ChangeEvent, FormEvent } from 'react'
import makeStorageClient from '../lib/storageClient'
import { getFileName, getFileSize, makeFileUrl } from '../lib/fileUpload'
import sendEmail from '../lib/sendEmail'
import Progress from './Progress'
import styles from '../styles/UploadForm.module.css'
import prettyBytes from 'pretty-bytes'
import { Mutator, Upload } from '../lib'
import BlurContainer from './BlurContainer'

type UploadFormProps = {
  spaceUsed: number,
  mutateSpaceUsed: Mutator,
  mutateUploads: Mutator
}

export default function UploadForm(
  { spaceUsed, mutateSpaceUsed, mutateUploads }: UploadFormProps
) {
  const [files, setFiles] = useState<File[]>([])
  const [rootCid, setRootCid] = useState('')
  const [percentUploaded, setPercentUploaded] = useState(10)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fileSize, setFileSize] = useState('')
  const [fileName, setFileName] = useState('')

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

    mutateUploads((currentUploads: Upload[]) =>
      [...currentUploads,
      {
        data: { name, cid, size, expiration }
      }],
      false)

    mutateSpaceUsed((currentSpaceUsed: number) =>
      currentSpaceUsed + size,
      false)

    await fetch('/api/files', {
      method: 'POST',
      body: JSON.stringify({ name, cid, size })
    })

    if (!email) return

    const fileUrl = makeFileUrl(cid, files)
    sendEmail(email, fileUrl)

    setFiles([])
  }

  async function handleSubscribe() {
    const expiration = Date.now() + (30 * 24 * 60 * 60 * 1000)
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ expiration })
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.formContainer}>
      <BlurContainer>
        <form onSubmit={e => handleSubmit(e)} className={styles.form}>
          {/* <button type="button" onClick={e => handleSubscribe()}>subscribe</button> */}
          <div className={styles.fileInputContainer}>
            <input
              type="file"
              name="file"
              onChange={e => handleChooseFile(e)}
            ></input>
            <label htmlFor="file" aria-hidden={true}>
              Choose file
            </label>
            <div className={styles.details}>
              <h1 className={styles.heading}>Add your files</h1>
              <p className={styles.spaceUsed}>You have used {prettyBytes(spaceUsed)} of 2 GB</p>
            </div>
          </div>
          <div className={styles.container}>
            {fileName
              ? <div className={styles.fileDetails}>{fileName}</div>
              : <div className={styles.noFileChosen}>No file chosen</div>}
            <hr className={styles.divider} />
            <label htmlFor="email">
              To: (Optional)
            </label>
            <input
              type="email"
              name="email"
              className={styles.email}
              onChange={e => setEmail(e.target.value)}
            ></input>
            <hr className={styles.divider} />
            {rootCid && <a href={makeFileUrl(rootCid, files)}>download</a>}
          </div>
          <button
            type="submit"
            className={`${styles.submitButton} default`}
            disabled={files.length === 0}
          >Ferry it
          </button>
        </form>
      </BlurContainer>
      {isLoading && (
        <BlurContainer isBackground>
          <div className={styles.progressContainer}>
            <Progress progress={percentUploaded} radius={100} stroke={10} />
          </div>
        </BlurContainer>
      )}
    </div>
  )
}