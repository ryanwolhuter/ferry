import Head from 'next/head'
import { useUser } from '../lib/hooks'

export default function Layout({ children }) {
  const { user } = useUser()

  return (
    <>
    <Head>
      <title>Ferry</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header>
      <h1>Ferry</h1>
    </header>

    <main>
      <div className="container">{children}</div>
      {user &&
        <div>
          <span>{user.email}</span>
          <a href="/api/logout">Logout</a>
        </div>}
    </main>
    </>
  )
}