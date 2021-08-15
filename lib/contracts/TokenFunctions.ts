import { BigNumber, Contract } from 'ethers';

export const balance = async (TokenContract: Contract, address: string) => {
    let bal = await TokenContract.balanceOf(address)
    console.log(bal, bal.toString())
    return bal
}