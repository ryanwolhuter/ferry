import { useContext } from 'react'
import Web3Modal from 'web3modal'
import { useUser } from '../lib/hooks'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.svg'
import { useRouter } from 'next/router'
import AppContext from '../context/AppContext'
import { useState } from 'react'
import styled from 'styled-components'

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

  const Nav = styled.nav`
    position: fixed;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 50% 1fr 1fr auto;
    height: 4.5rem;
    width: 100vw;
    align-items: center;
    z-index: 2;
    background: rgba(251, 251, 251, 0.05);
    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.25),
      inset 0px 0px 8px rgba(255, 255, 255, 0.29);
    backdrop-filter: blur(140px);
  `

  const ImageWrapper = styled.div`
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    cursor: pointer;
  `

  const A = styled.a`
    text-decoration: none;
    text-align: center;
    display: grid;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    height: 100%;

    &:hover {
      background: var(--purple-pink-orange-gradient);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      border-bottom: 2px solid var(--purple);
    }
  `

  const MenuButton = styled.button`
    width: fit-content;
  font-weight: bold;
  margin-left: 24px;
  margin-right: 24px;
  padding-left: 12px;
  background: rgba(251, 251, 251, 0.05);
  box-shadow: 0px 0px 25px rgba(98, 11, 129, 0.12);
  cursor: pointer;
  `

  const Options = styled.div`
  display: grid;
  padding: 32px;
  position: absolute;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  width: 230px;
  right: 16px;
  top: 5rem;
  background: white;
  background: #ffffff;
  box-shadow: 0px 0px 25px rgba(98, 11, 129, 0.12);
  border-radius: 30px;
  transition: all 0.4s;

  &.hidden {
    top: -500px;
    opacity: 0;
  }
  `

  const Button = styled.button`
  width: 140px;
  color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 17px rgba(116, 6, 226, 0.37);
  }

  &:first-child {
    background: var(--purple-pink-orange-gradient);
  }

  &:nth-child(2) {
    background: var(--pink-orange-gradient)
  }

  &:nth-child(3) {
    background: var(--white);
    border: 1px solid var(--pink);
    color: var(--pink);
  }
  `

  return (
    <Nav>
      <ImageWrapper onClick={() => router.push('/')}>
        <Image
          src={logo}
          alt="Ferry logo"
        />
      </ImageWrapper>
      <Link href="/about" passHref>
        <A>About</A>
      </Link>
      <A onClick={() => props.toggleShowSubscribeForm()}>Pro Account</A>
      {user &&
        <MenuButton onClick={() => setShowUserOptions(!showUserOptions)}>
          {user?.email}
          <br />
          {userAddress}
        </MenuButton>}
      <Options>
        <Button onClick={() => handleConnectWallet()}>Connect Wallet</Button>
        <Button onClick={async () => await router.push('/dashboard')}>Dashboard</Button>
        <Button onClick={() => logout()}>Logout</Button>
      </Options>
    </Nav>
  )
}