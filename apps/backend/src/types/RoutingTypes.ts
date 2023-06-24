export interface PoolPair {
  symbol: PoolPairSymbol;
  tokenA: TokenSymbol;
  tokenB: TokenSymbol;
  priceRatio: [number, number];
}

export const availableTokens = ['ETH', 'BTC', 'DOGE', 'DFI'];
export type PoolPairSymbol = string;
export type TokenSymbol = string;

export interface AllRoutesResult {
  fromToken: TokenSymbol;
  toToken: TokenSymbol;
  routes: PoolPair[][];
}

export interface BestRouteResult {
  fromToken: TokenSymbol;
  toToken: TokenSymbol;
  bestRoute: PoolPair[];
  estimatedReturn: number;
}
