import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { Web3Storage } from 'web3.storage'

async function uploadFiles() {
  const files = fileInput.files
  const rootCid = await storeWithProgress(files)
  resultBox.innerText = `https://dweb.link/ipfs/${rootCid}`
}

function makeStorageClient() {
  return new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN ?? '' })
}

// async function storeFiles(files) {
//   try {
//     const client = makeStorageClient()
//     const cid = await client.put(files)
//      return cid
//   } catch (e) {
//     console.error(e)
//   }
// }

async function storeWithProgress(files) {
  // show the root cid as soon as it's ready
  const onRootCidReady = cid => {
    resultBox.innerText = `uploading... 5% complete`
  }

  // when each chunk is stored, update the percentage complete and display
  const totalSize = 
    Array.from(files)
    .map(f => f.size)
    .reduce((a, b) => a + b)
  let uploaded = 0

  const onStoredChunk = size => {
    uploaded += size
    const pct = uploaded / totalSize * 100
    resultBox.innerText = `uploading... ${pct.toFixed(2)}% complete`
  }

  // makeStorageClient returns an authorized Web3.Storage client
  const client = makeStorageClient()

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, { onRootCidReady, onStoredChunk })
}

export default function Home() {
  const [isUploadButtonDisabled, setIsUploadButtonDisabled] = useState(true)
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

        <input type="file" name="fileInput" id="fileInput" onChange={e => setIsUploadButtonDisabled(false)}></input>
      <button id="uploadButton" disabled={isUploadButtonDisabled}>Submit</button>
      <div id="result"></div>
      </main>

      <footer className={styles.footer}>
      
      </footer>
    </div>
  )
}
