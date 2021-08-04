import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

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
