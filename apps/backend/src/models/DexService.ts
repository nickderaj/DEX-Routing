import { availableTokens, poolPairs } from '@/db/PoolDb';
import { PoolPair, PoolPairSymbol } from '@/types/RoutingTypes';

export class DexService {
  static getPool(symbol: PoolPairSymbol): PoolPair | undefined {
    return poolPairs.filter((poolPair) => symbol === poolPair.symbol)[0];
  }

  static validateInputs(fromToken: string, toToken: string, poolPair?: string): [boolean, string] {
    const validTokens = availableTokens.includes(fromToken.toUpperCase()) && availableTokens.includes(toToken.toUpperCase());
    if (poolPair) {
      const validPoolPair = poolPairs.map((pool) => pool.symbol).includes(poolPair.toUpperCase());
      if (!validPoolPair) return [false, 'Invalid pool pair!'];
    }
    if (!validTokens) return [false, 'Invalid tokens!'];

    return [true, ''];
  }

  // Helper function to calculate the amount of tokenB received for a given amount of tokenA
  static calculateSwapAmount(amountA: number, priceRatio: number[]): number {
    const [tokenAValue, tokenBValue] = priceRatio;
    return (amountA * tokenBValue) / tokenAValue;
  }

  // Helper function to recursively find all possible swap routes between two tokens
  static findRoutes(fromToken: string, toToken: string, currentPath: string[], allRoutes: string[][]): void {
    if (fromToken === toToken) {
      allRoutes.push(currentPath);
      return;
    }

    const relevantPools = poolPairs.filter((pool) => pool.tokenA === fromToken || pool.tokenB === fromToken);

    for (const pool of relevantPools) {
      const nextToken = pool.tokenA === fromToken ? pool.tokenB : pool.tokenA;
      if (!currentPath.includes(nextToken)) {
        const newPath = [...currentPath, nextToken];
        this.findRoutes(nextToken, toToken, newPath, allRoutes);
      }
    }
  }

  static findAllRoutes(fromToken: string, toToken: string): string[][] {
    const allRoutes: string[][] = [];
    this.findRoutes(fromToken, toToken, [fromToken], allRoutes);
    return allRoutes;
  }
}

export type DexServiceType = typeof DexService;
