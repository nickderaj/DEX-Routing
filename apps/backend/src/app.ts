import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';
import { dexRoutes } from './routes/dexRoutes';
import { StatusEnum } from './types/ApiTypes';

const app: Express = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', async (_req, res) => res.status(StatusEnum.OK).json({ message: 'OK' }));
app.use('/api/v1/routes', dexRoutes);

export default app;
