import { useEffect, useState } from 'react'
// @ts-ignore
import Web3 from "web3";
import Web3Modal from "web3modal";
import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed } from '../lib/hooks'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Progress from '../components/Progress'
import UploadForm from '../components/UploadForm'
import BlurContainer from '../components/BlurContainer'
import Uploads from '../components/Uploads'
import { getContracts } from '../lib/contracts/ContractBooter';

import { contractAddresses, abis } from '../constants/chain';
import { balance, getSubscriptionEnd } from '../lib/contracts/ContractFunctions';


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

  console.log(provider, contracts)

  useEffect(() => {
    console.log(provider, contracts);

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
    if(contracts && contracts.ferryContract && provider.selectedAddress){
      getSubscriptionEnd(contracts.ferryContract, provider.selectedAddress)
    }
  }, [contracts, provider])

  return (
    <Layout provider={provider} updateProvider={setProvider}>
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