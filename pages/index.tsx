import { useEffect, useState } from 'react'
import { useUser, useFirstRender } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import UploadForm from '../components/UploadForm'
import SubscribeForm from '../components/SubscribeForm'

export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [showSubscribeForm, setShowSubscribeForm] = useState(false)

  const isFirstRender = useFirstRender()
  const { user, userLoading } = useUser()

  function toggleShowSubscribeForm() {
    setShowSubscribeForm(!showSubscribeForm)
  }

  useEffect(() => {
    if (user && !userLoading && !initialized) {
      setInitialized(true)
    }
  }, [user, userLoading, initialized])

  useEffect(() => {
    // if no user is logged in,
    // rediret to the `/login` page automatically
    if (!(user || userLoading) && !isFirstRender) {
      router.push('/login')
    }
  }, [user, userLoading, isFirstRender, router])

  return (
    <Layout toggleShowSubscribeForm={toggleShowSubscribeForm}>
      {initialized
        ? <>
          {!showSubscribeForm && <UploadForm />}
          {showSubscribeForm && <SubscribeForm />}
        </>
        : <div />
      }
    </Layout>
  )
}