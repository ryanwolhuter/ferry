import { useContext } from "react";
import Web3Modal from "web3modal";
var Contract = require('web3-eth-contract');

import styles from '../styles/NavBar.module.css'
import { useUser } from '../lib/hooks'
import Link from 'next/link'
import Button from './Button'
import Image from 'next/image'
import logo from '../public/logo.svg'


import { contractAddresses, abis } from '../constants/chain'
import AppContext from '../context/AppContext'

export default function NavBar(props: any) {
  const { user } = useUser()
  const { setProvider, provider } = useContext(AppContext);

  const { updateProvider, } = props

  const buttonLabel = provider ? "Disconnect Wallet" : "Connect Wallet"
  const userAddress = provider ? provider.selectedAddress.substring(0, 18) + '...' : "Connect wallet"

  const handleLogIn = async () => {
    if (provider) {
      // Disconnect Wallet
      updateProvider(null)
    } else {
      // Connect Wallet
      const providerOptions = {}
      const web3Modal = new Web3Modal({
        network: "mumbai", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });
      const prov = await web3Modal.connect();
      setProvider(prov)
    }
  }

  async function logout() {
    await fetch('/api/logout')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.imageWrapper}>
        <Image
          src={logo}
          alt="Ferry logo"
        />
      </div>
      <Link href="/about">
        <a className={styles.link}>About</a>
      </Link>
      <a onClick={e => props.toggleShowSubscribeForm()} className={styles.link}>Pro Account</a>
      {user &&
        <button className={styles.userMenu} onClick={handleLogIn}>
          <div>
            <style jsx>{`
                div {
                  width: 32px;
                  height: 32px;
                  border-radius: 100%;
                  background: linear-gradient(77.23deg, #F173CD 4.4%, #E394C0 45.66%, #FFB800 111.45%);
                  margin-right: 8px;
                }
              `}</style>
          </div>
          {user?.email}
          <br />
          {userAddress}
        </button>}
      {user &&
        <>
          {/* <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span>{user.email}</span>
            <span>Account: {userAddress}</span>
          </div> */}

          {/* <Button onClick={handleClick}>{buttonLabel}</Button> */}
          {/* <Button onClick={test}>Test</Button> */}

          {/* <Link href="/api/logout">
            <a>Logout</a>
          </Link> */}
        </>}
    </nav>
  )
}