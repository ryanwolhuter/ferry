import '../styles/globals.scss'
import type { AppProps } from 'next/app'
// @ts-ignore

import { StoreProvider } from '../context/Store';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
export default MyApp
