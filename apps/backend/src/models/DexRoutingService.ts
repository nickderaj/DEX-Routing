import { AllRoutesResult, BestRouteResult, TokenSymbol } from '@/types/RoutingTypes';

export class DexRoutingService {
  static async listAllRoutes(fromTokenSymbol: TokenSymbol, toTokenSymbol: TokenSymbol): Promise<AllRoutesResult> {
    return {
      fromToken: fromTokenSymbol,
      toToken: toTokenSymbol,
      routes: [], // TODO
    };
  }

  static async getBestRoute(fromTokenSymbol: TokenSymbol, toTokenSymbol: TokenSymbol): Promise<BestRouteResult> {
    return {
      fromToken: fromTokenSymbol,
      toToken: toTokenSymbol,
      bestRoute: [], // TODO
      estimatedReturn: 0,
    };
  }
}
