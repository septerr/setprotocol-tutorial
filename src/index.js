import SetProtocol from 'setprotocol.js';
import * as Web3 from 'web3';

// Kovan Config
const config = {
  coreAddress: '0x3ee64Fe0b9246Ae52845F01A79c4b3A6D252289a',
  exchangeIssuanceModuleAddress: '0x887E45236B280B33C743075ac11dD69E3c581697',
  kyberNetworkWrapperAddress: '0x4093415A2eA915EaacF44Ac08A42434aE6A9d4e5',
  protocolViewerAddress: '0x5754FA9d232812F817F5Ca58152Ad1E991e916dD',
  rebalanceAuctionModuleAddress: '0xeA510E982c92620A19475F8Dc777bAaa3c2A00F5',
  rebalancingSetExchangeIssuanceModule: '0xC2eF8799315E08f4ee08eA29913D2e51dba5aB78',
  rebalancingSetIssuanceModule: '0x91E1489D04054Ae552a369504F94E0236909c53c',
  rebalancingSetTokenFactoryAddress: '0xdc5B19c7085eBEE3AF84cf30418c0ECa11Ed1933',
  setTokenFactoryAddress: '0x952F78C33D3fb884C00b22e69B9119cd70582F80',
  transferProxyAddress: '0x61d264865756751392C0f00357Cc26ea70D98E3B',
  vaultAddress: '0x45Ab785b6c04f11b5e49B03d60f3642A8Ffe9246',
  wrappedEtherAddress: '0x8a18c7034aCEfD1748199a58683Ee5F22e2d4e45',
};

const injectedWeb3 = window.Web3 || undefined;
let provider;
try {
  // Use MetaMask/Mist provider
  provider = injectedWeb3.currentProvider;
} catch (err) {
  // Throws when user doesn't have MetaMask/Mist running
  throw new Error(`No injected web3 found when initializing setProtocol: ${err}`);
}

const setProtocol = new SetProtocol(provider, config);

const createStableSet = async function() {
    const trueUSDAddress = '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B';
    const daiAddress = '0x1d82471142F0aeEEc9FC375fC975629056c26ceE';
  
    const componentAddresses = [trueUSDAddress, daiAddress];
    const { units, naturalUnit } = await setProtocol.calculateSetUnitsAsync(
      componentAddresses,
      [new BigNumber(1), new BigNumber(1)],
      [new BigNumber(0.5), new BigNumber(0.5)],
      new BigNumber(1),
    );
    const name = 'Stable Set';
    const symbol = 'STBL';
    const txOpts = {
      from: '0x8FfB4E5E8C80BaD09f9Fa185a0b5F3ae1d9E5802',
      gas: 4000000,
      gasPrice: 8000000000,
    };
  
    const txHash = await setProtocol.createSetAsync(
      componentAddresses,
      units,
      naturalUnit,
      name,
      symbol,
      txOpts,
    );
    return await setProtocol.getSetAddressFromCreateTxHashAsync(txHash);
  };

  console.log(createStableSet())