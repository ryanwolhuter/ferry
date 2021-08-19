import { useEffect, useState } from 'react'
import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed } from '../lib/hooks'
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
      && !initialized) {
      setInitialized(true)
    }
  }, [user, spaceUsedLoading, filesLoading, userLoading, initialized, files])

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
          {/* <button onClick={e => setShowSubscribeForm(!showSubscribeForm)}>toggle subscribe form</button> */}
          {!showSubscribeForm && <UploadForm
            spaceUsed={spaceUsed}
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