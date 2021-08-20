import { useUser, useFirstRender, useAllFiles, useUserSpaceUsed, useSubscriptionExpires } from '../lib/hooks'
import Uploads from "../components/Uploads";
import Layout from '../components/Layout';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { getSHIPBalance, getAccountNFTDetails, mintNFT, getSubscriptionEnd } from '../lib/contracts/ContractFunctions';
import { PolygonscanURL } from '../constants/chain';
import Image from 'next/image'
import prettyBytes from 'pretty-bytes';
import AppContext from '../context/AppContext';

const LegendarySVG = require("../public/assets/LEGENDARY.svg")
const EpicSVG = require("../public/assets/EPIC.svg")
const RareSVG = require("../public/assets/RARE.svg")
const CommonSVG = require("../public/assets/COMMON.svg")

export default function Dashboard(props: any) {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [shipBalance, setShipBalance] = useState(0)
  const [nftRandomNum, setNftRandomNum] = useState(0)
  const [nftIndex, setNftIndex] = useState(0)
  const [nftTokenID, setNftTokenID] = useState(38)
  const [nftRarity, setNftRarity] = useState("")
  const [nftSVG, setNftSVG] = useState<any>("")

  const [showWaitingForRandomNum, setShowWaitingForRandomNum] = useState(true)
  const [showClaimNFTView, setShowClaimNFTView] = useState(false)


  const { provider, contracts } = useContext(AppContext);

  const isFirstRender = useFirstRender()

  const { user, loading: userLoading } = useUser()
  const { files, loading: filesLoading, mutate: mutateFiles } = useAllFiles()
  const { spaceUsed, loading: spaceUsedLoading, mutate: mutateSpaceUsed } = useUserSpaceUsed()
  const { subscriptionExpires, loading: subscriptionExpiresLoading, mutate: mutateSubscriptionExpires } = useSubscriptionExpires()

  // TODO add NFT available to mint btn


  useEffect(() => {
    if (provider && provider.selectedAddress && contracts && contracts.ferryContract && !nftRandomNum) {
      const interval = setInterval(async () => {

        console.log("I werk", nftRandomNum);

        let randNumOutput = 0

        const nftData = await getAccountNFTDetails(contracts.ferryContract, provider.selectedAddress)
        if (nftData && nftData.randomNum) {
          console.log("MADE IT HERE", nftData, nftRandomNum);
          // taking last 4 digits of random num
          let actualRandomNum = parseInt(nftData.randomNum.slice(-4))
          setNftRandomNum(actualRandomNum)
          randNumOutput = actualRandomNum
        }

        console.log("trying to clear interval:", nftRandomNum);
        if (randNumOutput) {
          setShowWaitingForRandomNum(false)
          setShowClaimNFTView(parseInt(nftData.index) === 0)
          clearInterval(interval)
        }

      }, 2000);
    }
  }, [contracts, nftRandomNum, provider])


  useEffect(() => {
    const getOnChainData = async () => {
      if (provider && provider.selectedAddress && contracts && contracts.ferryContract && contracts.shipTokenContract) {
        const shipBal = await getSHIPBalance(contracts.shipTokenContract, provider.selectedAddress)
        console.log(shipBal);
        const nftData = await getAccountNFTDetails(contracts.ferryContract, provider.selectedAddress)
        console.log(nftData);

        if (nftData && nftData.randomNum) {
          // taking last 4 digits of random num
          let actualRandomNum = parseInt(nftData.randomNum.slice(-4))
          setNftRandomNum(actualRandomNum)
        }

        console.log("extracted random num:", nftRandomNum);

        // TODO fix with nftData.randomNum
        // TODO handle data case where NFT available to mint
        const rarityScore = (nftRandomNum % 1000) + 1

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

        if (shipBal) setShipBalance(shipBal)
        if (nftData && nftData.index) setNftIndex(nftData.index)
        if (nftData && nftData.tokenID) setNftTokenID(nftData.tokenID)
      }
    }
    getOnChainData()
  }, [contracts, nftRandomNum, provider])

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

  // useEffect(() => {
  //   function isPro() {
  //     if (!subscriptionExpires) return false

  //     return subscriptionExpires > Date.now()
  //   }

  //   if (!(isPro() || subscriptionExpiresLoading) && !isFirstRender) {
  //     router.push('/')
  //   }
  // }, [isFirstRender, router, subscriptionExpires, subscriptionExpiresLoading])

  const viewNFTOnPolygonscan = () => {
    window.open(PolygonscanURL + nftTokenID, '_blank');
  }

  const handleClaimNFT = async () => {
    if (provider && provider.selectedAddress && contracts && contracts.ferryContract) {
      const res = await mintNFT(contracts.ferryContract, provider.selectedAddress)
      // Once minted, get all NFT data for state
      const nftData = await getAccountNFTDetails(contracts.ferryContract, provider.selectedAddress)
      console.log(nftData);

      if (nftData && nftData.randomNum) {
        // taking last 4 digits of random num
        let actualRandomNum = parseInt(nftData.randomNum.slice(-4))
        setNftRandomNum(actualRandomNum)
      }

      console.log("extracted random num:", nftRandomNum);
      const rarityScore = (nftRandomNum % 1000) + 1

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

      if (nftData && nftData.index) setNftIndex(nftData.index)
      if (nftData && nftData.tokenID) setNftTokenID(nftData.tokenID)

      setShowClaimNFTView(false)
    }
  }

  const renderViewNFTView = () => {
    return <div className="nftDetails">
      <h2 className="nftName">
        Ferry #{nftIndex}
      </h2>
      {/* NFT image */}
      <div className="nftContainer">
        {nftSVG && <Image src={nftSVG} alt={nftRarity + " Ferry NFT."} />}
      </div>
      <h3>Properties</h3>
      <p>{nftRarity}</p>
      <button className="viewOnPolyscan" onClick={viewNFTOnPolygonscan}>View on Polygonscan</button>
    </div>
  }

  const renderClaimNFTView = () => {
    return <div className="nftDetails">
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

  const renderConnectWalletView = () => {
    return <div className="nftDetails" style={{
      width: "100%",
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'center',
    }}>
      <h3>
        Connect Wallet
      </h3>
    </div>
  }

  console.log("waiting:", showWaitingForRandomNum);
  console.log("show claim:", showClaimNFTView);

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
          <h1>Token Balances</h1>

          {
            provider && provider.selectedAddress ?
              <div>
                <div className="stats">
                  <div className="gov stat">
                    <h2>ERC20</h2>
                    <p className="bigNumber">{shipBalance}</p>
                    <p className="bigUnit">SHIP</p>
                  </div>
                  <div className="nft stat">
                    <h2>NFT</h2>
                    <p className="bigNumber">{showClaimNFTView ? 0 : 1}</p>
                    <p className="bigUnit">FERRY</p>
                  </div>
                </div>
                <h1>Your NFTs</h1>
                {
                  showWaitingForRandomNum ?
                    <h3>Waiting...</h3> : //TODO add loader
                    showClaimNFTView ? renderClaimNFTView() : renderViewNFTView()
                }
              </div> :
              renderConnectWalletView()
          }




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
            margin-top: 48px;
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