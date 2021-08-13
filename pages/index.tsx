import { useEffect, useState } from 'react'
import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Spinner from '../components/Progress'
import UploadForm from '../components/UploadForm'
import BlurContainer from '../components/BlurContainer'

export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const isFirstRender = useFirstRender()

  const { user, loading: userLoading } = useUser()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()
  const { spaceUsed, loading: spaceUsedLoading, mutate: mutateSpaceUsed } = useUserSpaceUsed()

  useEffect(() => {
    if (user && !userLoading && !spaceUsedLoading && !initialized) {
      setInitialized(true)
    }
  }, [user, spaceUsedLoading, userLoading, initialized])

  useEffect(() => {
    // if no user is logged in,
    // rediret to the `/login` page automatically
    if (!(user || userLoading) && !isFirstRender) {
      router.push('/login')
    }
  }, [user, userLoading, isFirstRender, router])

  return (
    <Layout>
      {initialized
        ? <BlurContainer>
          <>
            <UploadForm
              spaceUsed={spaceUsed}
              mutateUploads={mutateFiles}
              mutateSpaceUsed={mutateSpaceUsed} />
          </>
        </BlurContainer>
        : <Spinner />
      }
    </Layout>
  )
}