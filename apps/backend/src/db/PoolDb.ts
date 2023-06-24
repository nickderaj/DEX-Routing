import { PoolPair } from '@/types/RoutingTypes';

// Added USDT pairs to the sample data to teset more combinations
export const poolPairs: PoolPair[] = [
  {
    symbol: 'ETH-DFI',
    tokenA: 'ETH',
    tokenB: 'DFI',
    priceRatio: [1, 5], // 1 ETH === 5 DFI
  },
  {
    symbol: 'BTC-DFI',
    tokenA: 'BTC',
    tokenB: 'DFI',
    priceRatio: [2, 1337], // 2 BTC === 1,337 DFI
  },
  {
    symbol: 'DOGE-DFI',
    tokenA: 'DOGE',
    tokenB: 'DFI',
    priceRatio: [18933, 5], // 18,933 DOGE === 5 DFI
  },
  {
    symbol: 'DOGE-ETH',
    tokenA: 'DOGE',
    tokenB: 'ETH',
    priceRatio: [18617, 1], // 18,617 DOGE === 1 ETH
  },
  {
    symbol: 'BTC-ETH',
    tokenA: 'BTC',
    tokenB: 'ETH',
    priceRatio: [1, 132], // 1 BTC === 132 ETH
  },
  {
    symbol: 'BTC-USDT',
    tokenA: 'BTC',
    tokenB: 'USDT',
    priceRatio: [35000, 1], // 35,000 BTC === 1 USDT
  },
  {
    symbol: 'ETH-USDT',
    tokenA: 'ETH',
    tokenB: 'USDT',
    priceRatio: [2200, 1], // 2,200 ETH === 1 USDT
  },
  {
    symbol: 'DOGE-USDT',
    tokenA: 'DOGE',
    tokenB: 'USDT',
    priceRatio: [0.3, 1], // 0.3 DOGE === 1 USDT
  },
];

const tokens = poolPairs.reduce((acc, pool) => {
  acc[pool.tokenA] = true;
  acc[pool.tokenB] = true;
  return acc;
}, {} as Record<string, boolean>);

export const availableTokens = Object.keys(tokens);
export const availableSymbols = poolPairs.map((pool) => pool.symbol);
