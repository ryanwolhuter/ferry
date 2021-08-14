import '../styles/globals.scss'
import type { AppProps } from 'next/app'
// @ts-ignore
import { useWallet, UseWalletProvider } from 'use-wallet'

import { chainID } from '../constants/chain'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider
      chainId={chainID}>
      <Component {...pageProps} />
    </UseWalletProvider>
  )
}
export default MyApp
