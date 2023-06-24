import { DexService } from '@/models/DexService';
import { StatusEnum } from '@/types/ApiTypes';
import { Request } from 'express';

export class DexController {
  static listAllRoutes(req: Request) {
    const { fromToken, toToken } = req.params;

    // 1. Validate tokens exist
    const [isValid, errorMessage] = DexService.validateInputs(fromToken, toToken);
    if (!isValid) {
      return { statusCode: StatusEnum.NOT_FOUND, data: { message: errorMessage } };
    }

    // 2. Find all the routes
    const routes: string[][] = DexService.findAllRoutes(fromToken, toToken);

    return { statusCode: StatusEnum.OK, data: { message: 'test', routes } };
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

    return { statusCode: StatusEnum.OK, data: { message: 'test', bestRoute } };
  }
}
