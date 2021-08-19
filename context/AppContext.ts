import { createContext } from 'react';

export const AppContext = createContext({
    provider: null,
    contracts: [],
    setProvider: (provider) => { },
    setContracts: (contracts) => { },
});

export default AppContext