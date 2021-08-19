export const setProvider = (provider, dispatch) => {
    dispatch({
        type: 'SET_PROVIDER',
        provider: provider,
    })
};

export const bootContracts = (contracts, dispatch) => {
    dispatch({
        type: 'BOOT_CONTRACTS',
        contracts: contracts,
    })
};