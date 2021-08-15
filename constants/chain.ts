// All values here are for Mumbai Testnet
export const chainID = 80001
export const gasPrice = 2000000000 // 2 gwei
export const maxSubscribeMonths = 24
export const DaiPricePerMonth = 2
export const PolygonscanURL = "https://mumbai.polygonscan.com/token/0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7?a="
export const contractAddresses = {
    shipToken: "0xDFa0D38387edad2176F6dE96ddE2833C9949606E",
    shipStaking: "0x8B910250892cc78c41FcF5889744Fb638Fead54d",
    ferry: "0x1BEc7A448e663bB0c738F5384aAA5C0746Ca2f98",
    minter: "0xB2eEa6CB978FE625755952ee03B9125345831641",
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
