import { DexController } from '@/controllers/dexController';
import { apiHandler } from '@/middlewares/apiHandler';
import { Router } from 'express';

const dexRoutes: Router = Router();

dexRoutes.route('/tokens').get(apiHandler(DexController.getAllTokens));
dexRoutes.route('/pools').get(apiHandler(DexController.getAllPools));
dexRoutes.route('/symbols').get(apiHandler(DexController.getAllSymbols));

dexRoutes.route('/from/:fromToken/to/:toToken').get(apiHandler(DexController.getAllRoutes));
dexRoutes.route('/best/from/:fromToken/to/:toToken').get(apiHandler(DexController.getBestRoute));
dexRoutes.route('/from/:fromToken/to/:toToken/:poolPair').get(apiHandler(DexController.getRouteByPool));

export { dexRoutes };
