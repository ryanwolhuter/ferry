import { useCallback, useEffect, useState } from 'react'
import { useIsMounted, useUser } from '../lib/hooks'
import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'
import Layout from '../components/Layout'

export default function Login() {
  const router = useRouter()
  const { user } = useUser()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const isMounted = useIsMounted()
  
  useEffect(() => {
    // if a user is already logged in,
    // redirect to home page
    if (user) router.push('/')
  }, [user, router])

  const login = useCallback(async (email: string) => {
    if (isMounted() && errorMsg) setErrorMsg(null)

    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY)
      const didToken = await magic.auth.loginWithMagicLink({ email })

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${didToken}`
        },
        body: JSON.stringify({ email })
      })
      if (res.status === 200) {
        router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('ERROR: ', error)
      if (isMounted()) setErrorMsg(error.message)
    }
  }, [errorMsg, isMounted, router])

  const onSubmit = useCallback(e => {
    e.preventDefault()

    if (isLoggingIn) return

    setIsLoggingIn(true)
    login(e.currentTarget.email.value)
      .then(() => setIsLoggingIn(false))
  }, [login, isLoggingIn])

  return (
    <Layout>
      <form onSubmit={onSubmit}>
        <h2>Log in</h2>
        <label htmlFor="email">Email <span aria-hidden={true}>*</span>
        <input type="email" name="email" required placeholder="you@example.com" />
        </label>

        <button disabled={isLoggingIn} type="submit">Sign Up / Log in</button>

        {errorMsg && <p className="error">{errorMsg}</p>}
      </form>
    </Layout>
  )
}