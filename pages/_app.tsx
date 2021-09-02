import { useEffect, useState } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AppContext from '../context/AppContext'
import { ContractSet, getContracts } from '../lib/contracts/ContractBooter'

export const InitialContracts = {
  ferryContract: null,
  minterContract: null,
  shipTokenContract: null,
  shipStakingContract: null,
  daiContract: null
}

function MyApp({ Component, pageProps }: AppProps) {

  const [provider, setProvider] = useState(null)
  const [contracts, setContracts] = useState<ContractSet>(InitialContracts)

  useEffect(() => {
    if (provider && provider.selectedAddress) {
      const newContracts = getContracts(provider)
      console.log(newContracts)
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
