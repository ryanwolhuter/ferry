import '../styles/globals.scss'
import type { AppProps } from 'next/app'
// @ts-ignore
import { useWallet, UseWalletProvider } from 'use-wallet'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider>
      <Component {...pageProps} />
    </UseWalletProvider>
  )
}
export default MyApp
