import { useEffect, useState } from 'react'
// import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { useWallet, UseWalletProvider } from 'use-wallet'
import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Progress from '../components/Progress'
import UploadForm from '../components/UploadForm'
import BlurContainer from '../components/BlurContainer'
import Uploads from '../components/Uploads'

export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const isFirstRender = useFirstRender()
  const wallet = useWallet()
  // const { account } = useWeb3React();

  const { user, loading: userLoading } = useUser()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()
  const { spaceUsed, loading: spaceUsedLoading, mutate: mutateSpaceUsed } = useUserSpaceUsed()

  useEffect(() => {
    console.log(wallet, wallet.status);
  
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
    <Layout>
      {initialized
        ? <BlurContainer>
          <>
            <UploadForm
              spaceUsed={spaceUsed}
              mutateUploads={mutateFiles}
              mutateSpaceUsed={mutateSpaceUsed} />
            <Uploads
              files={files}
              mutateUploads={mutateFiles}
              mutateSpaceUsed={mutateSpaceUsed} />
          </>
        </BlurContainer>
        : <Progress />
      }
    </Layout>
  )
}