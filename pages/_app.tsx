import { useEffect, useState } from 'react';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
// @ts-ignore

import AppContext from '../context/AppContext';
import { getContracts } from '../lib/contracts/ContractBooter';

function MyApp({ Component, pageProps }: AppProps) {

  const [provider, setProvider] = useState(null)
  const [contracts, setContracts] = useState<any>([])

  useEffect(() => {
    if (provider && provider.selectedAddress) {
      const newContracts = getContracts(provider)
      console.log(newContracts);
      setContracts(newContracts)
    }
  }, [provider])

  return (
    <AppContext.Provider value={{
      provider,
      setProvider,
      contracts,
      setContracts,
    }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
export default MyApp
