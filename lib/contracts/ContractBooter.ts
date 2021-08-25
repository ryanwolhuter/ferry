
import { contractAddresses, abis } from '../../constants/chain'
import Web3 from 'web3'
var Contract = require('web3-eth-contract')

export type ContractSet = {
    ferryContract: any,
    minterContract: any,
    shipTokenContract: any,
    shipStakingContract: any,
    daiContract: any
}

export function getContracts(provider: any) {

    if (!provider || !provider.selectedAddress) {
        return null
    }

    Contract.setProvider(provider)

    const ferryContract = new Contract(
        abis.FERRY,
        contractAddresses.ferry
    )

    const minterContract = new Contract(
        abis.MINTER,
        contractAddresses.minter
    )

    const shipTokenContract = new Contract(
        abis.ERC20,
        contractAddresses.shipToken
    )

    const shipStakingContract = new Contract(
        abis.ERC20,
        contractAddresses.shipStaking
    )

    const daiContract = new Contract(
        abis.ERC20,
        contractAddresses.dai
    )

    const contracts = {
        ferryContract,
        minterContract,
        shipTokenContract,
        shipStakingContract,
        daiContract
    }
    return contracts
}
