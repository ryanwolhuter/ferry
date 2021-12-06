import React, { useState, ChangeEvent, FormEvent } from 'react'
import makeStorageClient from '../lib/storageClient'
import { getFileName, getFileSize, makeFileUrl } from '../lib/fileUpload'
import sendEmail from '../lib/sendEmail'
import Progress from './Progress'
import styles from './UploadForm.module.css'
import prettyBytes from 'pretty-bytes'
import { Upload } from '../lib'
import BlurContainer from './BlurContainer'
import Link from 'next/link'
import { useUser, useSubscriptionDetails, useSpaceUsed, useFiles } from '../lib/hooks'
import styled from 'styled-components'
import FileInput from './FileInput'
import EmailInput from './EmailInput'
import RangeInput from './RangeInput'
import Button from './Button'

export default function UploadForm() {
  const [files, setFiles] = useState<File[]>([])
  const [rootCid, setRootCid] = useState('')
  const [percentUploaded, setPercentUploaded] = useState(10)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [showProgress, setShowProgress] = useState(false)
  const [expiration, setExpiration] = useState(24 * 60 * 60 * 1000)

  const { user } = useUser()
  const { subscriptionDetails } = useSubscriptionDetails()
  const { spaceUsed, mutateSpaceUsed } = useSpaceUsed()
  const { mutateFiles } = useFiles()

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
    setFileName(name)
  }

  async function handleSubmit(submitEvent: FormEvent) {
    submitEvent.preventDefault()
    setShowProgress(true)

    const cid = await storeWithProgress(files)

    if (!cid) return

    const name = getFileName(files)
    const size = getFileSize(files)

    mutateFiles((currentUploads: Upload[]) =>
      [...currentUploads,
      { data: { name, cid, size, expiration } }],
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
    setEmail('')
  }

  const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    padding: 20px;
    padding-left: 160px;
    padding-right: 160px;
    padding-top: 120px;
    padding-bottom: 80px;
  `

  const Form = styled.form`
    display: grid;
    position: relative;
  `

  return (
    <Wrapper>
      <BlurContainer>
        <Form onSubmit={e => handleSubmit(e)}>
          <FileInput onChange={e => handleChooseFile(e)} />
          <h1>Add your files</h1>
          <p>You have used {prettyBytes(spaceUsed)} of 2 GB</p>
          {fileName
            ? <div>{decodeURI(fileName)}</div>
            : <div>No file chosen</div>}
          <hr />
          <EmailInput onChange={e => setEmail(e.target.value)} />
          <p>File expiry</p>
          <div>
            <RangeInput
              name="expiration"
              value={expiration}
              max={48 * 60 * 60 * 1000}
              min={60 * 1000}
              step={60 * 1000}
              onChange={e => setExpiration(Number(e.target.value))}
              disabled={!subscriptionDetails.isPro}
            />
            <p>{Math.ceil(expiration / 60 / 60 / 1000)} hours</p>
          </div>
          <Button
            type="submit"
            disabled={files.length === 0}
          >Ferry it
          </Button>
        </Form>
      </BlurContainer>
      <BlurContainer isBackground show={showProgress}>
          <div>
            <h1>{isLoading ? 'Uploading your file' : 'Your files are ferried!'}</h1>
              <Progress progress={percentUploaded} />
            {!isLoading && <div>
              <Link href={makeFileUrl(rootCid, files)}><a>{makeFileUrl(rootCid, files)}</a></Link>
            </div>}
          </div>
      </BlurContainer>
    </Wrapper>
  )
}