import Head from 'next/head'
import Background from './Background'
import NavBar from './NavBar'
import styles from '../styles/Layout.module.css'
import { ReactNode } from 'react'


type LayoutProps = {
  children: ReactNode,
  provider?: any,
  updateProvider?: any,
  contracts?: any,
  toggleShowSubscribeForm?: any,
  hasBackground?: boolean,
  hasNav?: boolean
}

export default function Layout(
  { children,
    provider,
    updateProvider,
    contracts,
    toggleShowSubscribeForm,
    hasBackground = true,
    hasNav = true
  }: LayoutProps
) {

  return (
    <>
      <Head>
        <title>Ferry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {hasBackground && <Background />}

      {/* @ts-ignore */}
      {hasNav && <NavBar provider={provider} updateProvider={updateProvider} contracts={contracts} toggleShowSubscribeForm={toggleShowSubscribeForm} />}
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  )
}