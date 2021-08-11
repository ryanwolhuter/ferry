import Head from 'next/head'
import Link from 'next/link'
import Background from './Background'
import { useUser } from '../lib/hooks'
import styles from '../styles/Layout.module.css'

type LayoutProps = {
  children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  const { user, loading: userLoading } = useUser()

  return (
    <>
      <Head>
        <title>Ferry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background />

      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
        {user &&
          <div>
            <span>{user.email}</span>
            <Link href="/api/logout">
              <a>Logout</a>
            </Link>
          </div>}
      </main>
    </>
  )
}