import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, ChangeEvent, MouseEvent } from 'react'
import { Web3Storage } from 'web3.storage'

function makeStorageClient() {
  const token = process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN ?? ''
  return new Web3Storage({ token })
}

export default function Home() {
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const [fileName, setFileName] = useState('')
  const [rootCid, setRootCid] = useState('')
  const [percentUploaded, setPercentUploaded] = useState('0%')

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
  

  function handleInput(inputEvent: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(inputEvent?.target?.files ?? [])
    setFiles(files)
    setFileName(files?.[0]?.name)
    setIsUploadButtonDisabled(false)
  }

  async function handleSubmit(submitEvent: MouseEvent) {
    submitEvent.preventDefault()

    await storeWithProgress(files)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Ferry</title>
        <meta name="description" content="Move your files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ferry
        </h1>

      <input type="file" name="fileInput" onChange={e => handleInput(e)}></input>
      <button onClick={e => handleSubmit(e)} disabled={isUploadButtonDisabled}>Submit</button>
      <div>Percent uploaded: {percentUploaded}</div>
      <div>Result: https://dweb.link/ipfs/{rootCid}</div>
      <div>Direct <a download href={`https://${rootCid}.ipfs.dweb.link/${fileName}`}>download</a></div>
      </main>

      <footer className={styles.footer}>
      
      </footer>
    </div>
  )
}
