import styles from '../styles/NavBar.module.css'
import { useUser } from '../lib/hooks'
import Link from 'next/link'
import Button from './Button'

import Web3 from "web3";
var Contract = require('web3-eth-contract');
import Web3Modal from "web3modal";

import { contractAddresses, abis } from '../constants/chain'

export default function NavBar(props: any) {
  const { user } = useUser()

  const { provider, updateProvider } = props

  const buttonLabel = provider ? "Disconnect Wallet" : "Connect Wallet"
  const userAddress = provider ? provider.selectedAddress : "No wallet found"

  const handleClick = async () => {
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
      updateProvider(prov)
    }
  }

  const test = async () => {
    console.log(provider);

    Contract.setProvider(provider);

    // @ts-ignore
    const DaiContract = new Contract(abis.ERC20, contractAddresses.dai);

    DaiContract.methods.approve(contractAddresses.ferry, 0).send({
      // @ts-ignore
      from: provider.selectedAddress
    })
  }

  return (
    <nav className={styles.navbar}>
      {user &&
        <>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span>{user.email}</span>
            <span>Account: {userAddress}</span>
          </div>

          <Button onClick={handleClick}>{buttonLabel}</Button>
          <Button onClick={test}>Test</Button>

          <Link href="/api/logout">
            <a>Logout</a>
          </Link>
        </>}
    </nav>
  )
}