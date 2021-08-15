import Head from 'next/head'
import Background from './Background'
import NavBar from './NavBar'
import styles from '../styles/Layout.module.css'


type LayoutProps = {
  children: JSX.Element
}

export default function Layout(props: any, { children }: LayoutProps) {
  const { provider, updateProvider } = props

  return (
    <>
      <Head>
        <title>Ferry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background />

      {/* @ts-ignore */}
      <NavBar provider={provider} updateProvider={updateProvider}/>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  )
}