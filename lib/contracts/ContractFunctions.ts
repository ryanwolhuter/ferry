import { ethers } from "ethers";
import { contractAddresses, gasPrice } from "../../constants/chain";

// TODO test
// amount = number of $ or DAI e.g. 1 if $1
export const approveDaiFerry = async (DaiContract: any, userAddress: string, amount: number) => {
    // 0/blank amount or no contract/address will cause fail
    if (!DaiContract || !userAddress || !amount) return null

    const scaledAmount = ethers.utils.parseUnits(amount+"", "ether")
    const res = await DaiContract.methods.approve(contractAddresses.ferry, scaledAmount).send({
        from: userAddress,
        gasPrice: gasPrice
    })

    console.log(res)
    return res
}

// TODO test
// amount = number of $ or DAI e.g. 1 if $1
export const paySubscription = async (FerryContract: any, address: string, amount: number) => {
    // 0/blank amount or no contract/address will cause fail
    if (!FerryContract || !address || !amount) return null

    const scaledAmount = ethers.utils.parseUnits(amount+"", "ether")
    const res = await FerryContract.methods.paySubscription(address, scaledAmount).send({
        from: address,
        gasPrice: gasPrice
    })

    console.log(res)
    return res
}

// TODO test
export const mintNFT = async (FerryContract: any, address: string) => {
    if (!FerryContract || !address ) return null

    const res = await FerryContract.methods.mintNFT(address).send({
        from: address,
        gasPrice: gasPrice
    })

    console.log(res)
    return res
}

export const getSubscriptionEnd = async (FerryContract: any, address: string) => {
    // if can't get time
    if (!FerryContract || !address) return null

    console.log(FerryContract)

    FerryContract.methods.getMembershipExpiryTime(address).call((err: any, result: any) => {
        if (err) {
            console.log(err)
            return null
        } else {
            console.log(result)
            return result
        }
    })
}

export const getSHIPBalance = async (ShipTokenContract: any, address: string) => {
    if (!ShipTokenContract || !address) return null

    ShipTokenContract.methods.balanceOf(address).call((err: any, result: any) => {
        if (err) {
            console.log(err)
            return null
        } else {
            console.log(result)
            return result
        }
    })
}

export const getAccountNFTDetails = async (FerryContract: any, address: string) => {
    if (!FerryContract || !address) return null

    FerryContract.methods.getAccountNFT(address).call((err: any, result: any) => {
        if (err) {
            console.log(err)
            return null
        } else {
            console.log(result)
            return result
        }
    })
}
