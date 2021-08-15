// All values here are for Mumbai Testnet
export const chainID = 80001
export const contractAddresses = {
    shipToken: "0x1EFcb17a4F5B628E82Fe8048D3B41ED0fdF375E3",
    shipStaking: "0x74972961bbC7739403cA9ceec7Bab1290E1b555d",
    ferry: "0x0D3e25E6B337bdf1F6293609F59133C57522c0A8",
    minter: "0x26205b8667286bB528f9D81af40A9415Ec30a3fa",
    dai: "0x001b3b4d0f3714ca98ba10f6042daebf0b1b7b6f"
}

const ERC20 = require('../interfaces/ERC20.json')
const FERRY = require('../interfaces/Ferry.json')
const MINTER = require('../interfaces/FerryNFTMinter.json')
const STAKING = require('../interfaces/ShipHarbor.json')

export const abis = {
    ERC20: ERC20.abi,
    FERRY: FERRY.abi,
    MINTER: MINTER.abi,
    STAKING: STAKING.abi,
}
