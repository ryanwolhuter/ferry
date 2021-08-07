import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: `
          if (document.cookie && document.cookie.includes('authed')) {
            window.location.href = "/dashboard"
          }
        `}} />
      </Head>
      <Link href="/login"><a>Login</a></Link>
    </>
  )
}