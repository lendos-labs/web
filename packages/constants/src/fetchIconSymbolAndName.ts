/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export const unPrefixSymbol = (symbol: string, prefix: string) => {
  return symbol.toUpperCase().replace(RegExp(`^(${prefix[0]}?${prefix.slice(1)})`), '');
};

/**
 * Maps onchain symbols to different symbols.
 * This is useful when you want to explode symbols via _ to render multiple symbols or when the symbol has a bridge prefix or suffix.
 */
export const SYMBOL_MAP: Record<string, string> = {
  'USDT.e': 'USDT',
};

/**
 * Maps (potentially altered via SYMBOL_MAP) symbols to a name
 * With the next version of uipooldataprovider https://github.com/aave/aave-v3-periphery/pull/89 this list can be greatly reduced/removed.
 */
export const SYMBOL_NAME_MAP: Record<string, string> = {
  AVAX: 'Avalanche',
  ETH: 'Ethereum',
  EUROS: 'STASIS EURO',
  FAI: 'Fei USD',
  GHST: 'Aavegotchi GHST',
  GUSD: 'Gemini Dollar',
  LINK: 'ChainLink',
  MAI: 'MAI (mimatic)',
  MANA: 'Decentraland',
  MKR: 'Maker',
  PAX: 'Paxos Standard',
  RAI: 'Rai Reflex Index',
  REP: 'Augur',
  SAVAX: 'Benqi Staked Avalanche',
  STETH: 'Lido Staked Ether',
  STKAAVE: 'Stake Aave',
  TUSD: 'TrueUSD',
  UNI: 'Uniswap',
  UNIDAIWETH: 'UNI DAI/WETH',
  UNIWBTCUSDC: 'UNI WBTC/USDC',
  USDT: 'Tether',
  WAVAX: 'Wrapped Avalanche',
  WBTC: 'Wrapped BTC',
  WETH: 'Wrapped ETH',
  WFTM: 'Wrapped FTM',
  WMATIC: 'Wrapped Matic',
  WONE: 'Wrapped ONE',
  YFI: 'yearn.finance',
  ZRX: '0x Coin',
  '1INCH': '1inch Network',
  LUSD: 'LUSD Stablecoin',
};

export interface IconSymbolInterface {
  underlyingAsset: string;
  symbol: string;
  name?: string;
}

export interface IconMapInterface {
  iconSymbol: string;
  name?: string;
  symbol?: string;
}

export function fetchIconSymbolAndName({ underlyingAsset, symbol, name }: IconSymbolInterface) {
  const underlyingAssetMap: Record<string, IconMapInterface> = {
    '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c': {
      name: 'BTCB Token',
      symbol: 'BTCB',
      iconSymbol: 'btc',
    },
  };

  const lowerUnderlyingAsset = underlyingAsset.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(underlyingAssetMap, lowerUnderlyingAsset)) {
    return {
      symbol,
      ...underlyingAssetMap[lowerUnderlyingAsset],
    };
  }

  const unifiedSymbol = unPrefixSymbol((SYMBOL_MAP[symbol] ?? symbol).toUpperCase(), 'AMM');

  return {
    iconSymbol: unifiedSymbol,
    name: SYMBOL_NAME_MAP[unifiedSymbol.toUpperCase()] ?? name ?? unifiedSymbol,
    symbol,
  };
}
