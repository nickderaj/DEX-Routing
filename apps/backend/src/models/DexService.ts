import { poolPairs } from '@/db/PoolDb';
import { PoolPair, PoolPairSymbol, TokenSymbol, availableTokens } from '@/types/RoutingTypes';

export class DexService {
  static listPools(): PoolPair[] {
    return poolPairs;
  }

  static getPool(symbol: PoolPairSymbol): PoolPair | undefined {
    const pools = this.listPools();
    return pools.filter((poolPair) => symbol === poolPair.symbol)[0];
  }

  static listTokens(): TokenSymbol[] {
    const tokens: Set<TokenSymbol> = new Set();

    const pools = this.listPools();
    pools.forEach((poolPair) => {
      tokens.add(poolPair.tokenA);
      tokens.add(poolPair.tokenB);
    });

    return [...tokens];
  }

  static validateInputs(fromToken: string, toToken: string): [boolean, string] {
    const validTokens = availableTokens.includes(fromToken.toUpperCase()) && availableTokens.includes(toToken.toUpperCase());
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

    const pools = DexService.listPools();
    const relevantPools = pools.filter((pool) => pool.tokenA === fromToken || pool.tokenB === fromToken);

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
