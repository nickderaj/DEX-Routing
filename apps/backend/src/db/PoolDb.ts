import { PoolPair } from '@/types/RoutingTypes';

// Added SOL-AVAX pair to add one that the others can't reach
export const poolPairs: PoolPair[] = [
  {
    symbol: 'ETH-DFI',
    tokenA: 'ETH',
    tokenB: 'DFI',
    priceRatio: [1, 5163], // 1 ETH === 5163 DFI
  },
  {
    symbol: 'BTC-DFI',
    tokenA: 'BTC',
    tokenB: 'DFI',
    priceRatio: [1, 83811], // 1 BTC === 83,811 DFI
  },
  {
    symbol: 'USDT-DFI',
    tokenA: 'USDT',
    tokenB: 'DFI',
    priceRatio: [1, 3], // 1 USDT === 3 DFI
  },
  {
    symbol: 'AVAX-ETH',
    tokenA: 'AVAX',
    tokenB: 'ETH',
    priceRatio: [143, 1], // 143 AVAX === 1 ETH
  },
  {
    symbol: 'BTC-ETH',
    tokenA: 'BTC',
    tokenB: 'ETH',
    priceRatio: [1, 16], // 1 BTC === 132 ETH
  },
  {
    symbol: 'BTC-USDT',
    tokenA: 'BTC',
    tokenB: 'USDT',
    priceRatio: [1, 30000], // 30,000 BTC === 1 USDT
  },
  {
    symbol: 'ETH-USDT',
    tokenA: 'ETH',
    tokenB: 'USDT',
    priceRatio: [1, 2200], // 2,200 ETH === 1 USDT
  },
  {
    symbol: 'DOGE-USDT',
    tokenA: 'DOGE',
    tokenB: 'USDT',
    priceRatio: [14, 1], // 14 DOGE === 1 USDT
  },
  {
    symbol: 'XTZ-SOL',
    tokenA: 'XTZ',
    tokenB: 'SOL',
    priceRatio: [1, 1.3], // 1 DFI === 1.3 SOL
  },
];

const tokens = poolPairs.reduce((acc, pool) => {
  acc[pool.tokenA] = true;
  acc[pool.tokenB] = true;
  return acc;
}, {} as Record<string, boolean>);

export const availableTokens = Object.keys(tokens);
export const availableSymbols = poolPairs.map((pool) => pool.symbol);
