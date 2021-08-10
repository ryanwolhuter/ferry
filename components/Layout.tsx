import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '../lib/hooks'

type LayoutProps = {
  children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
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
          <Link href="/api/logout">
            <a>Logout</a>
          </Link>
        </div>}
    </main>
    </>
  )
}