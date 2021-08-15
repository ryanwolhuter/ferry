import { useEffect, useState } from 'react'
import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import UploadForm from '../components/UploadForm'
import SubscribeForm from '../components/SubscribeForm'
import { getContracts } from '../lib/contracts/ContractBooter';
import { getSubscriptionEnd } from '../lib/contracts/ContractFunctions';


export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [provider, setProvider] = useState<any>(null)
  const [contracts, setContracts] = useState<any>()
  const [subEndTime, setSubEndTime] = useState(0)
  const [showSubscribeForm, setShowSubscribeForm] = useState(false)

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