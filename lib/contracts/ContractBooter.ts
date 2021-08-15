
import { contractAddresses, abis } from '../../constants/chain';
import Web3 from "web3";
var Contract = require('web3-eth-contract');

// ? To "Boot" up a set of contracts, call this function and pass in a provider/web3 instance

export function getContracts(provider: any) {

    if(!provider || !provider.selectedAddress){
        return null
    }

    // example contract creations
    const ferryContract = new Contract(
        abis.FERRY,
        contractAddresses.ferry
    );

    const minterContract = new Contract(
        abis.MINTER,
        contractAddresses.minter
    )

    const daiContract = new Contract(
        abis.ERC20,
        contractAddresses.dai
    );

    // TODO add token and staking if this works
    const contracts = {
        ferryContract,
        minterContract,
        daiContract
    };
    return contracts;
}
