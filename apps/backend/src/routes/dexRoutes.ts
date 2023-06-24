import { DexController } from '@/controllers/dexController';
import { apiHandler } from '@/middlewares/apiHandler';
import { Router } from 'express';

const dexRoutes: Router = Router();

dexRoutes.route('/tokens').get(apiHandler(DexController.listAllTokens));
dexRoutes.route('/from/:fromToken/to/:toToken').get(apiHandler(DexController.listAllRoutes));
dexRoutes.route('/best/from/:fromToken/to/:toToken').get(apiHandler(DexController.getBestRoute));
dexRoutes.route('/from/:fromToken/to/:toToken/:poolPair').get(apiHandler(DexController.listRouteByPool));

export { dexRoutes };
