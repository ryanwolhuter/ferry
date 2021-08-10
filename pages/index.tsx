import { useEffect, useState } from "react"
import { useUser, useFirstRender, useAllFiles } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Spinner from "../components/Spinner"
import UploadForm from "../components/UploadForm"
import Uploads from "../components/Uploads"

export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const isFirstRender = useFirstRender()

  const { user, loading: userLoading } = useUser()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()

  useEffect(() => {
    if (user && !userLoading &&!filesLoading && !initialized) {
      setInitialized(true)
    }
  }, [user, files, userLoading, filesLoading, initialized])

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
        ? <>
          <UploadForm />
          <Uploads uploads={files.map((result: any) => result?.data)} />
        </>
        : <Spinner />
      }
    </Layout>
  )
}