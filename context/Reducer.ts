
const setProvider = (state, provider) => {
    return { ...state, provider: provider }
}

const bootContracts = (state, contracts) => {
    return { ...state, contracts: contracts }
}


export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROVIDER':
            return setProvider(state, action.provider);
        case 'BOOT_CONTRACTS':
            return bootContracts(state, action.contracts);
        default:
            return state;
    }
};