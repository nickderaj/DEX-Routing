import express from 'express';
import morgan from 'morgan';
import { dexRoutes } from './routes/dexRoutes';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/', async (_req, res) => res.status(200).send('OK'));
app.use('/api/v1/routes', dexRoutes);

const port = 8080;
app.listen(port, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});
