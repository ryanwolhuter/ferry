

export const balance = async (TokenContract: any, address: string) => {
    let bal = await TokenContract.balanceOf(address)
    console.log(bal, bal.toString())
    return bal
}

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

    let bal = await ShipTokenContract.balanceOf(address)
    console.log(bal, bal.toString())
    return bal
}