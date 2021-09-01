import { createContext } from 'react'
import { ContractSet } from '../lib/contracts/ContractBooter'

const InitialContracts = {
  ferryContract: null,
  minterContract: null,
  shipTokenContract: null,
  shipStakingContract: null,
  daiContract: null
}

export const AppContext = createContext({
  provider: null,
  contracts: InitialContracts,
  setProvider: (provider) => { },
  setContracts: (contracts: ContractSet) => { },
})

export default AppContext