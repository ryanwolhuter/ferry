import styles from '../styles/NavBar.module.css'
import { useUser } from '../lib/hooks'
import Link from 'next/link'

export default function NavBar() {
  const { user } = useUser()

  return (
    <nav className={styles.navbar}>
      {user &&
        <>
          <span>{user.email}</span>
          <Link href="/api/logout">
            <a>Logout</a>
          </Link>
        </>}
    </nav>
  )
}