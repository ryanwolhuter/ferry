import { useEffect, useState } from 'react'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import AppContext from '../context/AppContext'
import { ContractSet, getContracts } from '../lib/contracts/ContractBooter'
import { createGlobalStyle } from 'styled-components'

export const InitialContracts = {
  ferryContract: null,
  minterContract: null,
  shipTokenContract: null,
  shipStakingContract: null,
  daiContract: null
}

const GlobalStyles = createGlobalStyle`
:root {
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "Poppins", sans-serif;
  }


* {
  box-sizing: border-box;
  color: var(--black);
  transition: all 0.2s;
}

  --white: hsl(0, 0%, 100%);
  --black: #404040;
  --turquoise: #49fdfd;
  --blue: #5295a5;
  --purple: #a775f3;
  --yellow: #f8ce64;
  --pink: #fa74ae;
  --brown: #857987;
  --grey: #b1b1b1;
  --turquoise-gradient: linear-gradient(
    130.61deg,
    #00e0ff 14.74%,
    #66d8ca 67.28%
  );
  --blue-gradient: linear-gradient(
    121.46deg,
    #6aaab9 8.44%,
    #437581 47.02%,
    #34565f 83.26%
  );
  --purple-gradient: linear-gradient(113.28deg, #d982f8 8.12%, #8444e6 92.8%);
  --yellow-gradient: linear-gradient(148.58deg, #fee146 29.61%, #f8ce64 82.57%);
  --pink-gradient: linear-gradient(
    110.69deg,
    #fe9dc7 7.16%,
    #fa74ae 48.77%,
    #be4579 88.66%
  );
  --pink-orange-gradient: linear-gradient(
    77.23deg,
    #f173cd 4.4%,
    #e394c0 45.66%,
    #ffb800 111.45%
  );
  --purple-pink-orange-gradient: linear-gradient(
    77.23deg,
    #8055fc 26.71%,
    #e394c0 80.79%,
    #ffb800 111.45%
  );
}
`

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
      <GlobalStyles />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
export default MyApp
