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
          <h1>Token Balances</h1>
          <div className="gov">
            25 $SHIP
          </div>
          <div className="nft">
            1 ZORA
          </div>

          <h1>Your NFTs</h1>
          <div className="nft-details">
            <h2>
              Ferry #001
            </h2>
            {/* NFT image */}
            <h3>Properties</h3>
            <p>Legendary</p>
            <button>See on Polygon scan</button>
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