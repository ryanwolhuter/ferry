import styles from '../styles/NavBar.module.css'
import { useUser } from '../lib/hooks'
import Link from 'next/link'
import WalletButton from './WalletButton'

export default function NavBar() {
  const { user } = useUser()

  return (
    <nav className={styles.navbar}>
      {user &&
        <>
          <span>{user.email}</span>
          <WalletButton />
          <Link href="/api/logout">
            <a>Logout</a>
          </Link>
        </>}
    </nav>
  )
}