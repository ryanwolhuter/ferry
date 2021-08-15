

export const getSubscriptionEnd = async (FerryContract: any, address: string) => {
    // if can't get time
    if (!FerryContract || !address) return null

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

export const getAccountNFTDetails = async (MinterContract: any, address: string) => {
    if (!MinterContract || !address) return null

    MinterContract.methods.getAccountNFT(address).call((err: any, result: any) => {
        if (err) {
            console.log(err)
            return null
        } else {
            console.log(result)
            return result
        }
    })
}
