import { InjectedConnector } from '@web3-react/injected-connector';

export const supportedChains: { [key: number]: string } = {
  137: 'Matic Mainnet',
  77: 'Sokol Testnet',
  80001: 'Mumbai Testnet',
};

export const chainIDToNetwork: { [key: string]: string } = {
  '1': 'mainnet',
  '3': 'ropsten',
  '4': 'rinkeby',
  '5': 'goerli',
  '42': 'kovan',
  '137': 'Matic Mainnet',
  '80001': 'Mumbai Testnet',
};

export const chainIDToEndpoint: { [key: string]: string } = {
  '0': '',
  '1337': 'http://localhost:8545/',
  '137': `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_ALCHEMY_KEY}`,
  '80001': `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_ALCHEMY_KEY}`,
};

export const chainIDToBlockExplorer: { [key: string]: string } = {
  '0': '',
  '1': 'https://etherscan.io',
  '4': 'https://rinkeby.etherscan.io',
  '137': 'https://polygonscan.com/',
  '80001': 'https://mumbai.polygonscan.com/',
};

// this will handle injected wallets such as MetaMask
export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    1, 3, 4, 5, 42, 137, 80001,
  ],
});

const initOptions = {
  enableLogging: process.env.NODE_ENV === 'production' ? false : true,
  whiteLabel: {
    theme: {
      isDark: true,
      colors: {
        torusBrand1: '#fcac94',
      },
    },
    logoDark: 'https://tkey.surge.sh/images/Device.svg', // Dark logo for light background
    logoLight: 'https://tkey.surge.sh/images/Device.svg', // Light logo for dark background
    topupHide: false,
    featuredBillboardHide: true,
    disclaimerHide: true,
    defaultLanguage: 'es',
  },
  network: {
    host: chainIDToEndpoint[process.env.NEXT_PUBLIC_CHAIN_ID ?? ''],
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? ''),
    networkName: chainIDToNetwork[process.env.NEXT_PUBLIC_CHAIN_ID ?? ''],
  },
};

const constructorOptions = {
  buttonPosition: 'bottom-right',
};

const loginOptions = {};


// local chain IDs like 1337 are not supported by default by web3-react's portis connector (kak dom).
// You must pass in the url and chain id for your local chain/node as third config argument in constructor.
