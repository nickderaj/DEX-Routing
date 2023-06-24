import { poolPairs } from '@/db/PoolDb';
import { AllRoutesResult, BestRouteResult, PoolPair, TokenSymbol } from '@/types/RoutingTypes';

export class DexRoutingService {
  static _calculateReturnAmount(start: TokenSymbol, route: PoolPair[]): number {
    let amount = 1;
    let curr = start;

    for (const pair of route) {
      if (pair.tokenA === curr) {
        amount *= pair.priceRatio[1] / pair.priceRatio[0];
        curr = pair.tokenB;
      } else if (pair.tokenB === curr) {
        amount *= pair.priceRatio[0] / pair.priceRatio[1];
        curr = pair.tokenA;
      } else {
        throw new Error('Invalid route');
      }
    }

    return amount;
  }

  static async listAllRoutes(fromToken: TokenSymbol, toToken: TokenSymbol): Promise<AllRoutesResult> {
    const allRoutes: PoolPair[][] = [];
    const visited: Set<TokenSymbol> = new Set();

    function findRoutes(currentToken: TokenSymbol, targetToken: TokenSymbol, currentPath: PoolPair[]) {
      visited.add(currentToken);

      if (currentToken === targetToken) {
        allRoutes.push([...currentPath]);
      } else {
        const nextPairs = getPairsForToken(currentToken);

        for (const nextPair of nextPairs) {
          const nextToken = getNextToken(nextPair, currentToken);

          if (!visited.has(nextToken)) {
            currentPath.push(nextPair);
            findRoutes(nextToken, targetToken, currentPath);
            currentPath.pop();
          }
        }
      }

      visited.delete(currentToken);
    }

    function getPairsForToken(token: TokenSymbol): PoolPair[] {
      return poolPairs.filter((pair) => pair.tokenA === token || pair.tokenB === token);
    }

    function getNextToken(pair: PoolPair, currentToken: TokenSymbol): TokenSymbol {
      return pair.tokenA === currentToken ? pair.tokenB : pair.tokenA;
    }

    findRoutes(fromToken, toToken, []);

    return {
      fromToken,
      toToken,
      routes: allRoutes,
    };
  }

  static async getBestRoute(fromToken: TokenSymbol, toToken: TokenSymbol): Promise<BestRouteResult> {
    const allRoutesResult = await this.listAllRoutes(fromToken, toToken);
    const allRoutes = allRoutesResult.routes;

    let bestRoute: PoolPair[] | undefined;
    let estimatedReturn = 0;

    for (const route of allRoutes) {
      const returnAmount = this._calculateReturnAmount(fromToken, route);

      if (returnAmount > estimatedReturn) {
        bestRoute = route;
        estimatedReturn = returnAmount;
      }
    }

    return {
      fromToken: allRoutesResult.fromToken,
      toToken: allRoutesResult.toToken,
      bestRoute: bestRoute || [],
      estimatedReturn,
    };
  }
}
