import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UploadForm from '../components/UploadForm'

export default function Home() {
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

        <UploadForm />
      </main>

      <footer className={styles.footer}>
      
      </footer>
    </div>
  )
}
