import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed, useSubscriptionExpires } from '../lib/hooks'
import Uploads from "../components/Uploads";
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSHIPBalance, getAccountNFTDetails, mintNFT } from '../lib/contracts/ContractFunctions';
import { CommonSVG, EpicSVG, LegendarySVG, PolygonscanURL, RareSVG } from '../constants/chain';
import Image from 'next/image'
import prettyBytes from 'pretty-bytes';

// TODO use these instead of links
// const LegendarySVG = require("../assets/LEGENDARY.svg")
// const EpicSVG = require("../assets/EPIC.svg")
// const RareSVG = require("../assets/RARE.svg")
// const CommonSVG = require("../assets/COMMON.svg")

export default function Dashboard(props: any) {
  const { provider, contracts } = props
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [shipBalance, setShipBalance] = useState(0)
  const [nftRandomNum, setNftRandomNum] = useState(0)
  const [nftIndex, setNftIndex] = useState(0)
  const [nftTokenID, setNftTokenID] = useState(38)
  const [nftRarity, setNftRarity] = useState("")
  const [nftSVG, setNftSVG] = useState<any>("")

  const isFirstRender = useFirstRender()

  const { user, loading: userLoading } = useUser()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()
  const { spaceUsed, loading: spaceUsedLoading, mutate: mutateSpaceUsed } = useUserSpaceUsed()
  const { subscriptionExpires, loading: subscriptionExpiresLoading, mutate: mutateSubscriptionExpires } = useSubscriptionExpires()

  // TODO add SVGs
  // TODO add NFT available to mint btn

  useEffect(() => {
    const getOnChainData = async () => {
      if (provider && provider.selectedAddress && contracts && contracts.ferryContract && contracts.shipTokenContract) {

        // TODO handle data returned with state setters
        const shipBal = await getSHIPBalance(contracts.shipTokenContract, provider.selectedAddress)
        console.log(shipBal);
        const nftData = await getAccountNFTDetails(contracts.ferryContract, provider.selectedAddress)
        console.log(nftData);

        // setNftRandomNum()

        // TODO fix with nftData.randomNum
        // TODO handle data case where NFT available to mint
        const rarityScore = (999 % 1000) + 1

        if (rarityScore === 1000) {
          setNftRarity("Legendary")
          setNftSVG(LegendarySVG)
        } else if (rarityScore > 980) {
          setNftRarity("Epic")
          setNftSVG(EpicSVG)
        } else if (rarityScore > 780) {
          setNftRarity("Rare")
          setNftSVG(RareSVG)
        } else {
          setNftRarity("Common")
          setNftSVG(CommonSVG)
        }

      }
    }
    getOnChainData()
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
    window.open(PolygonscanURL + nftTokenID, '_blank');
  }

  const handleClaimNFT = async () => {
    if (provider && provider.selectedAddress && contracts && contracts.ferryContract) {
      const res = await mintNFT(contracts.ferryContract, provider.selectedAddress)

      // Once minted, get all NFT data for state
      const nftData = await getAccountNFTDetails(contracts.ferryContract, provider.selectedAddress)
      // TODO fill in rest of state setting
    }
  }

  const showClaimNFTView = (provider && contracts && nftRandomNum !== 0 && nftIndex === 0)

  const renderViewNFTView = () => {
    return <div className="nft-details">
      <h2>
        Ferry #{nftIndex}
      </h2>
      {/* NFT image */}
      <div>
        {nftSVG && <Image src={nftSVG} alt={nftRarity + " Ferry NFT."} />}
      </div>
      <h3>Properties:</h3>
      <p>{nftRarity}</p>
      <button className="viewOnPolyscan" onClick={viewNFTOnPolygonscan}>View on Polygonscan</button>
    </div>
  }

  const renderClaimNFTView = () => {
    return <div className="nft-details">
      <h2>
        Claim your Ferry NFT
      </h2>
      {/* Question mark image */}
      <div>
        {/* <img src={nftSVG} alt={nftRarity + " Ferry NFT."} /> */}
      </div>

      <button onClick={handleClaimNFT}>Claim Ferry NFT</button>
    </div>
  }


  return (
    <Layout hasBackground={false}>
      <div className="container">
        <div className="menu">
          <button className="account">⭑</button>
          <p>Account</p>
        </div>
        <div className="userDetails">
          <div className="details">
            <div className="basics">
              <h1>Basics</h1>
              <div className="avatar"></div>
              <p>{user?.email}</p>
            </div>
            <div className="quickStats">
              <h1>Quick Stats</h1>
              <div className="stats">
                <div className="stat">
                  <h2>Size Limit</h2>
                  <p className="bigNumber">32</p>
                  <p className="bigUnit">GB</p>
                </div>
                <div className="stat">
                  <h2>Used</h2>
                  <p className="bigNumber">{prettyBytes(spaceUsed).split(' ')[0]}</p>
                  <p className="bigUnit">{prettyBytes(spaceUsed).split(' ')[1]}</p>
                </div>
                <div className="stat">
                  <h2>Subscription</h2>
                  <p className="bigNumber">12</p>
                  <p className="bigUnit">M</p>
                </div>
              </div>

            </div>
          </div>
          <br />
          <h1>Link Management</h1>
          <Uploads files={files} mutateUploads={mutateFiles} mutateSpaceUsed={mutateSpaceUsed} />
        </div>
        <div className="tokens">
          {/* TODO add Connect Wallet view on panel */}
          <h1>Token Balances</h1>
          <div className="stats">
          <div className="gov stat">
            <h2>Gove ERC20</h2>
            <p className="bigNumber">{shipBalance}</p>
            <p className="bigUnit">SHIP</p>
          </div>
          <div className="nft stat">
            <h2>NFT ERC721</h2>
            <p className="bigNumber">{showClaimNFTView ? 0 : 1}</p>
             <p className="bigUnit">FERRY</p>
          </div>

          </div>
          <h1>Your NFTs</h1>

          {showClaimNFTView ? renderClaimNFTView() : renderViewNFTView()}

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