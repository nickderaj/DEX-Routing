import { Router } from 'express';
import { DexController } from '@/controllers/dexController';
import { apiHandler } from '@/middlewares/apiHandler';

const dexRoutes: Router = Router();

dexRoutes.route('/from/:fromToken/to/:toToken').get(apiHandler(DexController.listAllRoutes));
dexRoutes.route('/best/from/:fromToken/to/:toToken').get(apiHandler(DexController.getBestRoute));

export { dexRoutes };
