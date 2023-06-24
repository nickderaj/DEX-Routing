import { availableTokens, poolPairs } from '@/db/PoolDb';
import { PoolPair, PoolPairSymbol } from '@/types/RoutingTypes';

export class DexService {
  static getPool(symbol: PoolPairSymbol): PoolPair | undefined {
    const tokens = symbol.split('-');
    const eitherOrder = [`${tokens[0]}-${tokens[1]}`, `${tokens[1]}-${tokens[0]}`];
    return poolPairs.filter((poolPair) => eitherOrder.includes(poolPair.symbol))[0];
  }

  static validateInputs(fromToken: string, toToken: string, poolPair?: string): [boolean, string] {
    if (fromToken.toUpperCase() === toToken.toUpperCase()) return [false, 'Tokens must be different!'];

    const validTokens = availableTokens.includes(fromToken.toUpperCase()) && availableTokens.includes(toToken.toUpperCase());
    if (poolPair) {
      const validPoolPair = poolPairs.map((pool) => pool.symbol).includes(poolPair.toUpperCase());
      if (!validPoolPair) return [false, 'Invalid pool pair!'];
    }
    if (!validTokens) return [false, 'Invalid tokens!'];

    return [true, ''];
  }
}
