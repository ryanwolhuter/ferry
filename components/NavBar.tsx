import styles from '../styles/NavBar.module.css'
import { useUser } from '../lib/hooks'
import Link from 'next/link'
import Button from './Button'

// @ts-ignore
import { useWallet } from 'use-wallet'

export default function NavBar() {
  const { user } = useUser()
  const wallet = useWallet()

  const buttonLabel = wallet.status === "connected" ? "Connected" : "Connect Wallet"

  const handleClick = () => {
    if (wallet.status === "connected") {
      wallet.reset()
    } else {
      wallet.connect()
    }
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
            <span>Account: {wallet.account}</span>
          </div>

          <Button onClick={handleClick}>{buttonLabel}</Button>

          <Link href="/api/logout">
            <a>Logout</a>
          </Link>
        </>}
    </nav>
  )
}