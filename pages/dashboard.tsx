import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed, useSubscriptionExpires } from '../lib/hooks'
import Uploads from "../components/Uploads";
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSHIPBalance, getAccountNFTDetails } from '../lib/contracts/ContractFunctions';
import { PolygonscanURL } from '../constants/chain';

export default function Dashboard(props: any) {
  const { provider, contracts } = props
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [shipBalance, setShipBalance] = useState(0)
  const [nftIndex, setNftIndex] = useState(0)
  const [nftTokenID, setNftTokenID] = useState(38)
  const [nftRarity, setNftRarity] = useState("")

  const isFirstRender = useFirstRender()

  const { user, loading: userLoading } = useUser()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()
  const { spaceUsed, loading: spaceUsedLoading, mutate: mutateSpaceUsed } = useUserSpaceUsed()
  const { subscriptionExpires, loading: subscriptionExpiresLoading, mutate: mutateSubscriptionExpires } = useSubscriptionExpires()

  
  useEffect(async () => {
    if (provider && provider.selectedAddress && contracts && contracts.ferryContract && contracts.shipTokenContract) {

      const shipBal = await getSHIPBalance(contracts.shipTokenContract, provider.selectedAddress)
      console.log(shipBal);
      const nftData = await getAccountNFTDetails(contracts.ferryContract, provider.selectedAddress)
      console.log(nftData);

      // TODO fix with nftData.randomNum
      const rarityScore = (999 % 1000)+1

      if(rarityScore === 1000){
        setNftRarity("Legendary")
      } else if(rarityScore > 980) {
        setNftRarity("Epic")
      } else if(rarityScore > 780) {
        setNftRarity("Rare")
      } else {
        setNftRarity("Common")
      }
      
    }
  }, [contracts, provider])

  useEffect(() => {
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
  }, [user, subscriptionExpiresLoading, spaceUsedLoading, filesLoading, userLoading, initialized])

  useEffect(() => {
    // redirect to home if not pro
    if (!(user || userLoading) && !isFirstRender) {
      router.push('/')
    }
  }, [user, userLoading, isFirstRender, router])

  useEffect(() => {
    function isPro() {
      if (!subscriptionExpires) return false

      return subscriptionExpires > Date.now()
    }

    if (!(isPro() || subscriptionExpiresLoading) && !isFirstRender) {
      router.push('/')
    }
  }, [isFirstRender, router, subscriptionExpires, subscriptionExpiresLoading])


  // TODO might not need this?
  // const asyncUpdateState = async (targetFunction: any,  callbackSetter: any) => {
  //   let res = await targetFunction()
    
  // }

  const viewNFTOnPolygonscan = () => {
    window.open(PolygonscanURL+nftTokenID,'_blank');
  }

  return (
    <Layout hasBackground={false}>
      <div className="container">
        <div className="menu">
          <button>Account</button>
        </div>
        <div className="userDetails">
          <div className="details">
            <div className="basics">
              <h1>Basics</h1>
              {/* avatar */}
              <p>Username</p>
              <p>Email</p>
              <p>Pro account</p>
            </div>
            <div className="stats">
              <p>Storage Limit</p>
              <p>Storage Used</p>
              <p>Subscription</p>
            </div>
          </div>
          <Uploads files={files} mutateUploads={mutateFiles} mutateSpaceUsed={mutateSpaceUsed} />
        </div>
        <div className="tokens">
          {/* TODO add Connect Wallet view on panel */}
          <h1>Token Balances</h1>
          <div className="gov">
            {shipBalance} SHIP
          </div>
          <div className="nft">
            1 FERRY
          </div>

          <h1>Your NFTs</h1>
          <div className="nft-details">
            <h2>
              Ferry #{nftIndex}
            </h2>
            {/* NFT image */}
            <h3>Properties</h3>
            <p>{nftRarity}</p>
            <button onClick={viewNFTOnPolygonscan}>View on Polygonscan</button>
          </div>
        </div>
        <style jsx>{`
          div.container {
            width: 100vw;
            height: 100vh;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 146px auto 377px;
          }

          div.userDetails {
            margin-top: 108px;
          }

          div.details {
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr 1fr;
          }

          div.menu {
            padding-top: 108px;
            background: rgba(251, 251, 251, 0.05);
            box-shadow: 0px 0px 33px rgba(57, 29, 118, 0.18);
          }

          div.tokens {
            background: rgba(251, 251, 251, 0.05);
            box-shadow: 0px 0px 33px rgba(57, 29, 118, 0.18);
          }
          `}
        </style>
      </div>
    </Layout>
  )
}