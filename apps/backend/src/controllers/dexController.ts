import { availableSymbols, availableTokens, poolPairs } from '@/db/PoolDb';
import { DexRoutingService } from '@/models/DexRoutingService';
import { DexService } from '@/models/DexService';
import { StatusEnum } from '@/types/ApiTypes';
import { PoolPair } from '@/types/RoutingTypes';
import { Request } from 'express';

export class DexController {
  static async getAllTokens() {
    return { statusCode: StatusEnum.OK, data: { message: 'Fetched tokens successfully!', tokens: availableTokens } };
  }

  static async getAllPools() {
    return { statusCode: StatusEnum.OK, data: { message: 'Fetched pools successfully!', pools: poolPairs } };
  }

  static async getAllSymbols() {
    return { statusCode: StatusEnum.OK, data: { message: 'Fetched symbols successfully!', symbols: availableSymbols } };
  }

  static async getAllRoutes(req: Request) {
    const { fromToken, toToken } = req.params;

    // 1. Validate tokens exist
    const [isValid, errorMessage] = DexService.validateInputs(fromToken, toToken);
    if (!isValid) {
      return { statusCode: StatusEnum.NOT_FOUND, data: { message: errorMessage } };
    }

    // 2. Find all the routes
    const data = await DexRoutingService.listAllRoutes(fromToken, toToken);

    if (!data.routes.length) return { statusCode: StatusEnum.NOT_FOUND, data: { message: 'No route found!' } };
    return { statusCode: StatusEnum.OK, data: { message: 'Fetched routes successfully!', data } };
  }

  static async getRouteByPool(req: Request) {
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

    // 1. Validate tokens exist
    const [isValid, errorMessage] = DexService.validateInputs(fromToken, toToken);
    if (!isValid) {
      return { statusCode: StatusEnum.NOT_FOUND, data: { message: errorMessage } };
    }

    // 2. Find best routes
    const data = await DexRoutingService.getBestRoute(fromToken, toToken);
    if (!data.bestRoute.length) return { statusCode: StatusEnum.NOT_FOUND, data: { message: 'No route found!' } };

    return { statusCode: StatusEnum.OK, data: { message: 'Fetched route successfully!', data } };
  }
}
