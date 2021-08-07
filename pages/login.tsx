import { useRouter } from 'next/router'
import { Magic } from 'magic-sdk'

/**
 * Once we have the SDK installed we will need to import it and call Magic.loginWithMagicLink when the form is submitted. loginWithMagicLink will send an email to the authenticating user and they will follow a secure authentication process outside of our application.
 *
* Once the user has successfully authenticated with Magic, they'll be instructed to return to our app. At that point Magic will return a decentralized identifier or DID which we can use as a token in our application. 
 */

export default function Login() {
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()

    const { elements } = event.target

    const did = await new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY)
    .auth
    .loginWithMagicLink({ email: elements.email.value })

    // once we have the did from magic, login with our own api
    const authRequest = await fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Bearer ${did}`}
    })

    if (authRequest.ok) {
      // we successfullu logged in,
      // our api set authorization cookies
      // and now we can redirect to the dashboard
      router.push('/dashboard')
    } else {
      // TODO handle errors
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input name="email" type="email" />
      <button>Log in</button>
    </form>
  )
}