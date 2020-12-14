import * as bitcoin from 'bitcoinjs-lib';
import networks from '../../../constants/networks';

/**
 * Returns network code for a given network name
 *
 * @param {Object} network
 * @param {String} network.name - Mainnet, or Testnet
 * @returns {Number} network code
 */
export const getNetworkCode = network => (
  network.name === networks.mainnet.name
    ? networks.mainnet.code
    : networks.testnet.code
);

/**
 * Returns network config to use for future API calls.
 *
 * @param {Object} network
 * @param {String} network.name - Mainnet, or Testnet
 * @returns {Promise} A promise that resolves network config object
 * This method doesn't perform an async action, but it's a promise to
 * match the LSK getNetworkConfig function signature.
 */
export const getNetworkConfig = (network) => {
  const netCode = getNetworkCode(network);

  return new Promise(resolve =>
    resolve({
      isTestnet: netCode !== 0,
      url: netCode !== 0 ? 'https://btc-test.lisk.io' : 'https://btc.lisk.io',
      minerFeesURL: 'https://bitcoinfees.earn.com/api/v1/fees/recommended',
      network: netCode !== 0 ? bitcoin.networks.testnet : bitcoin.networks.bitcoin,
      derivationPath: netCode !== 0 ? "m/44'/1'/0'/0/0" : "m/44'/0'/0'/0/0",
      transactionExplorerURL: `https://www.blockchain.com/${netCode !== 0 ? 'btctest' : 'btc'}/tx`,
    }));
};