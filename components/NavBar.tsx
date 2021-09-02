import { useContext } from 'react'
import Web3Modal from 'web3modal'

import styles from './NavBar.module.scss'
import { useUser } from '../lib/hooks'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.svg'
import { useRouter } from 'next/router'

import AppContext from '../context/AppContext'
import { useState } from 'react'

export default function NavBar(props: any) {
  const { user } = useUser()

  const { setProvider, provider } = useContext(AppContext)

  const router = useRouter()

  const [showUserOptions, setShowUserOptions] = useState(false)

  const userAddress = provider ? provider.selectedAddress.substring(0, 18) + '...' : 'Connect wallet'

  const handleConnectWallet = async () => {
    if (provider) {
      // Disconnect Wallet
      setProvider(null)
    } else {
      // Connect Wallet
      const providerOptions = {}
      const web3Modal = new Web3Modal({
        network: 'mumbai', // optional
        cacheProvider: true, // optional
        providerOptions // required
      })
      const prov = await web3Modal.connect()
      setProvider(prov)
    }
  }

  async function logout() {
    await fetch('/api/logout')
    await router.push('/login')
  }

  return (
    <nav className={styles.navbar}>
      <div onClick={e => router.push('/')} className={styles.imageWrapper}>
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
        <button className={styles.userMenu} onClick={e => setShowUserOptions(!showUserOptions)}>
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
          <div className={`${styles.userOptions} ${showUserOptions ? '' : styles.hidden}`}>
              <button onClick={e => handleConnectWallet()} className={styles.button}>Connect Wallet</button>
              <button onClick={async e => await router.push('/dashboard')} className={styles.button}>Dashboard</button>
              <button onClick={e => logout()} className={styles.button}>Logout</button>
          </div>
    </nav>
  )
}