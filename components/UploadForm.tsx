
import { useState, ChangeEvent, FormEvent } from 'react'
import makeStorageClient from '../lib/storageClient'
import { getFileName, getFileSize, makeFileUrl } from '../lib/fileUpload'
import sendEmail from '../lib/sendEmail'
import Progress from './Progress'
import styles from '../styles/UploadForm.module.css'
import prettyBytes from 'pretty-bytes'
import { Mutator, Upload } from '../lib'
import BlurContainer from './BlurContainer'
import Link from 'next/link'
import { useUser } from '../lib/hooks'

type UploadFormProps = {
  spaceUsed: number,
  subscriptionExpires: number,
  mutateSpaceUsed: Mutator,
  mutateUploads: Mutator
}

export default function UploadForm(
  { spaceUsed, subscriptionExpires, mutateSpaceUsed, mutateUploads }: UploadFormProps
) {
  const [files, setFiles] = useState<File[]>([])
  const [rootCid, setRootCid] = useState('')
  const [percentUploaded, setPercentUploaded] = useState(10)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fileSize, setFileSize] = useState('')
  const [fileName, setFileName] = useState('')
  const [showProgress, setShowProgress] = useState(false)
  const [expiration, setExpiration] = useState(24 * 60 * 60 * 1000)
  const { user } = useUser()

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
    setShowProgress(true)

    const cid = await storeWithProgress(files)

    if (!cid) return

    const name = getFileName(files)
    const size = getFileSize(files)

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

    const fileUrl = makeFileUrl(cid, files)
    const sender = user?.email

    if (email) {
      sendEmail(email, fileUrl, sender)
    }

    setFiles([])
    setFileName('')
    setFileSize('')
    setEmail('')
  }

  function isPro() {
    if (!subscriptionExpires) return false

    return subscriptionExpires > Date.now()
  }

  return (
    <div className={styles.formContainer}>
      <BlurContainer>
        <form onSubmit={e => handleSubmit(e)} className={styles.form}>
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
              ? <div className={styles.fileDetails}>{decodeURI(fileName)}</div>
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
          </div>
          <p className={styles.fileExpiry}>File expiry</p>
          <div className="expiration">
            <input
              type="range"
              name="expiration"
              value={expiration}
              max={48 * 60 * 60 * 1000}
              min={60 * 1000}
              step={60 * 1000}
              onChange={e => setExpiration(Number(e.target.value))}
              disabled={!isPro()}
            />
            <p className={styles.fileExpiry}>{Math.ceil(expiration / 60 / 60 / 1000)} hours</p>
          </div>
          <button
            type="submit"
            className={`${styles.submitButton} default`}
            disabled={files.length === 0}
          >Ferry it
          </button>
        </form>
      </BlurContainer>
      <BlurContainer isBackground className={showProgress ? 'show' : 'hide'}>
        <div className="containerContainer">
          <div className="content">
            <h1>{isLoading ? 'Uploading your file' : 'Your files are ferried!'}</h1>
            <div className={styles.progressContainer}>
              <Progress progress={percentUploaded} radius={100} stroke={10} />
            </div>
            {!isLoading && <div className="linkContainer">
              <Link href={makeFileUrl(rootCid, files)}><a>{makeFileUrl(rootCid, files)}</a></Link>
            </div>}
          </div>
          <style jsx>
            {`
            div.containerContainer {
              display: grid;
              grid-template-rows: 1fr;
              grid-template-columns: 1fr 1fr;
            }
            div.content {
              grid-column-start: 2;
              padding-top: 40px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              text-align: center;
            }
            div.linkContainer {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              padding: 8px 16px;
              background: #FFFFFF;
              box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
              border-radius: 10px;
              width: 400px;
              height: 36px;
              margin-top: 36px;
              }
              a {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              div.expiration {
                display: flex;
                align-items: center;
              }
            `}
          </style>
        </div>
      </BlurContainer>
    </div>
  )
}