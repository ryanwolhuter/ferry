import { useEffect, useState } from 'react'
import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Progress from '../components/Progress'
import UploadForm from '../components/UploadForm'
import BlurContainer from '../components/BlurContainer'
import Uploads from '../components/Uploads'
import { getContracts } from '../lib/contracts/ContractBooter';

import { getSubscriptionEnd } from '../lib/contracts/ContractFunctions';
import { isPro } from '../lib/contracts/contractUtils';


export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [provider, setProvider] = useState<any>(null)
  const [contracts, setContracts] = useState<any>()
  const [subEndTime, setSubEndTime] = useState(0)
  const isFirstRender = useFirstRender()

  const { user, loading: userLoading } = useUser()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()
  const { spaceUsed, loading: spaceUsedLoading, mutate: mutateSpaceUsed } = useUserSpaceUsed()

  useEffect(() => {

    // TODO use this
    // isPro

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

  useEffect(() => {
    if (provider && provider.selectedAddress) {
      const contracts = getContracts(provider)
      console.log(contracts);
      setContracts(contracts)
    }
  }, [provider])

  useEffect(() => {
    if (contracts && contracts.ferryContract && provider && provider.selectedAddress) {
      getSubscriptionEnd(contracts.ferryContract, provider.selectedAddress)
    }
  }, [contracts, provider])

  return (
    <Layout provider={provider} updateProvider={setProvider}>
      {initialized
        ? <>
          <UploadForm
            spaceUsed={spaceUsed}
            mutateUploads={mutateFiles}
            mutateSpaceUsed={mutateSpaceUsed} />
          {/* <Uploads
            files={files}
            mutateUploads={mutateFiles}
            mutateSpaceUsed={mutateSpaceUsed} /> */}
        </>
        : <Progress />
      }
    </Layout>
  )
}