import Head from 'next/head'
import Background from './Background'
import NavBar from './NavBar'
import styles from '../styles/Layout.module.css'


type LayoutProps = {
  children: JSX.Element,
  provider?: any,
  updateProvider?: any,
  hasBackground?: boolean
}

export default function Layout({ children, provider, updateProvider, hasBackground = true }: LayoutProps) {

  return (
    <>
      <Head>
        <title>Ferry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {hasBackground && <Background />}

      {/* @ts-ignore */}
      <NavBar provider={provider} updateProvider={updateProvider}/>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  )
}