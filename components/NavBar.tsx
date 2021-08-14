import styles from '../styles/NavBar.module.css'
import { useUser } from '../lib/hooks'
import Link from 'next/link'
import Button from './Button'

// @ts-ignore
import { useWallet } from 'use-wallet'

export default function NavBar() {
  const { user } = useUser()
  const wallet = useWallet()

  return (
    <nav className={styles.navbar}>
      {user &&
        <>
          <span>{user.email}</span>
          <Button onClick={()=> wallet.connect()}/>
          <Link href="/api/logout">
            <a>Logout</a>
          </Link>
        </>}
    </nav>
  )
}