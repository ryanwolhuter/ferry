import { useEffect, useState } from 'react'
import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed, useSubscriptionExpires } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import UploadForm from '../components/UploadForm'
import SubscribeForm from '../components/SubscribeForm'

export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [showSubscribeForm, setShowSubscribeForm] = useState(false)

  const isFirstRender = useFirstRender()
  const { user, loading: userLoading } = useUser()
  const { subscriptionExpires, loading: subscriptionExpiresLoading } = useSubscriptionExpires()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()
  const { spaceUsed, loading: spaceUsedLoading, mutate: mutateSpaceUsed } = useUserSpaceUsed()

  function toggleShowSubscribeForm() {
    setShowSubscribeForm(!showSubscribeForm)
  }

  useEffect(() => {

    if (
      user && !userLoading
      && files && !filesLoading
      && !spaceUsedLoading
      && !subscriptionExpiresLoading
      && !initialized) {
      setInitialized(true)
    }
  }, [user, spaceUsedLoading, filesLoading, userLoading, initialized, files, subscriptionExpiresLoading])

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
          {!showSubscribeForm && <UploadForm
            spaceUsed={spaceUsed}
            subscriptionExpires={subscriptionExpires ?? 0}
            mutateUploads={mutateFiles}
            mutateSpaceUsed={mutateSpaceUsed}
          />}
          {showSubscribeForm && <SubscribeForm />}
        </>
        : <div />
      }
    </Layout>
  )
}