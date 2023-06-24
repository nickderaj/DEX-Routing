import { DexService } from '@/models/DexService';
import { StatusEnum } from '@/types/ApiTypes';
import { PoolPair } from '@/types/RoutingTypes';
import { Request } from 'express';

export class DexController {
  static async listAllTokens() {
    const tokens: string[] = DexService.listTokens();

    return { statusCode: StatusEnum.OK, data: { message: 'Fetched tokens successfully!', tokens } };
  }

  static async listAllRoutes(req: Request) {
    const { fromToken, toToken } = req.params;

    // 1. Validate tokens exist
    const [isValid, errorMessage] = DexService.validateInputs(fromToken, toToken);
    if (!isValid) {
      return { statusCode: StatusEnum.NOT_FOUND, data: { message: errorMessage } };
    }

    // 2. Find all the routes
    const routes: string[][] = DexService.findAllRoutes(fromToken, toToken);

    return { statusCode: StatusEnum.OK, data: { message: 'Fetched routes successfully!', routes } };
  }

  static async listRouteByPool(req: Request) {
    const { fromToken, toToken, poolPair } = req.params;

    // 1. Validate tokens exist
    const [isValid, errorMessage] = DexService.validateInputs(fromToken, toToken, poolPair);
    if (!isValid) {
      return { statusCode: StatusEnum.NOT_FOUND, data: { message: errorMessage } };
    }

    // 2. Find all the routes
    const route: PoolPair | null = DexService.getPool(poolPair) || null;

    if (!route) return { statusCode: StatusEnum.NOT_FOUND, data: { message: 'Pool pair not found!' } };
    return { statusCode: StatusEnum.OK, data: { message: 'Fetched routes successfully!', route } };
  }

  static async getBestRoute(req: Request) {
    const { fromToken, toToken } = req.params;

    // 1. Validate inputs
    const [isValid, errorMessage] = DexService.validateInputs(fromToken, toToken);
    if (!isValid) {
      return { statusCode: StatusEnum.NOT_FOUND, data: { message: errorMessage } };
    }

    // 2. Find all the routes
    const allRoutes = DexService.findAllRoutes(fromToken, toToken);

    let bestRoute: string[] = [];
    let bestAmount = 0;

    // 3. Loop through to find the best possible route
    for (const route of allRoutes) {
      let currentToken = fromToken;
      let currentAmount = 1;

      for (let i = 0; i < route.length; i++) {
        const pool = DexService.getPool(`${currentToken}-${route[i]}`);
        if (pool) {
          const amountOut = DexService.calculateSwapAmount(currentAmount, pool.priceRatio);
          currentAmount = amountOut;
          currentToken = route[i];
        } else {
          // If the pool doesn't exist, skip this route
          break;
        }
      }

      if (currentToken === toToken && currentAmount > bestAmount) {
        bestRoute = route;
        bestAmount = currentAmount;
      }
    }

    return { statusCode: StatusEnum.OK, data: { message: 'Fetched route successfully', route: bestRoute } };
  }
}
