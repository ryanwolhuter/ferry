import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed, useSubscriptionExpires } from '../lib/hooks'
import Uploads from "../components/Uploads";
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const isFirstRender = useFirstRender()

  const { user, loading: userLoading } = useUser()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()
  const { spaceUsed, loading: spaceUsedLoading, mutate: mutateSpaceUsed } = useUserSpaceUsed()
  const { subscriptionExpires, loading: subscriptionExpiresLoading, mutate: mutateSubscriptionExpires } = useSubscriptionExpires()

  function isPro() {
    if (!subscriptionExpires) return false

    return subscriptionExpires > Date.now()
  }

  useEffect(() => {

    // TODO use this
    // isPro

    if (
      user 
      && !userLoading
      && !filesLoading
      && !spaceUsedLoading
      && !subscriptionExpiresLoading
      && !initialized
      ) {
      setInitialized(true)
    }
  }, [user, subscriptionExpiresLoading ,spaceUsedLoading, filesLoading, userLoading, initialized])

  useEffect(() => {
    // redirect to home if not pro
    if (!(user || userLoading) && !isFirstRender) {
      router.push('/')
    }
  }, [user, userLoading, isFirstRender, router])

  useEffect(() => {
    if (!(isPro() || subscriptionExpiresLoading) && !isFirstRender) {
      router.push('/')
    }
  }, [isFirstRender, router, subscriptionExpiresLoading])


  return (
    <Layout>
      <Uploads files={files} mutateUploads={mutateFiles} mutateSpaceUsed={mutateSpaceUsed} />
    </Layout>
  )
}