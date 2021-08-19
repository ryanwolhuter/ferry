import { createContext } from 'react';
import { ContractSet } from '../lib/contracts/ContractBooter';
import { InitialContracts } from '../pages/_app';

export const AppContext = createContext({
    provider: null,
    contracts: InitialContracts,
    setProvider: (provider) => { },
    setContracts: (contracts: ContractSet) => { },
});

export default AppContext