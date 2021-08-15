import '../styles/globals.scss'
import type { AppProps } from 'next/app'
// @ts-ignore

function MyApp({ Component, pageProps }: AppProps) {
  console.log("-app");
  return <Component {...pageProps} />
}
export default MyApp
