import app from '@/app';
import { availableSymbols, availableTokens, poolPairs } from '@/db/PoolDb';
import { StatusEnum } from '@/types/ApiTypes';
import request from 'supertest';

it('should return OK for the health check route', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(StatusEnum.OK);
  expect(response.body).toEqual({ message: 'OK' });
});

it('should list all tokens', async () => {
  const response = await request(app).get('/api/v1/routes/tokens');
  expect(response.status).toBe(StatusEnum.OK);
  expect(response.body).toEqual(
    expect.objectContaining({ message: 'Fetched tokens successfully!', tokens: expect.arrayContaining(availableTokens) }),
  );
});

it('should list all pools', async () => {
  const response = await request(app).get('/api/v1/routes/pools');
  expect(response.status).toBe(StatusEnum.OK);
  expect(response.body).toEqual(
    expect.objectContaining({ message: 'Fetched pools successfully!', pools: expect.arrayContaining(poolPairs) }),
  );
});

it('should list all symbols', async () => {
  const response = await request(app).get('/api/v1/routes/symbols');
  expect(response.status).toBe(StatusEnum.OK);
  expect(response.body).toEqual(
    expect.objectContaining({ message: 'Fetched symbols successfully!', symbols: expect.arrayContaining(availableSymbols) }),
  );
});

it('should get routes by pool pair', async () => {
  const response = await request(app).get('/api/v1/routes/from/ETH/to/DFI/ETH-DFI');
  expect(response.status).toBe(StatusEnum.OK);
  expect(response.body).toEqual({
    message: 'Fetched routes successfully!',
    route: {
      symbol: 'ETH-DFI',
      tokenA: 'ETH',
      tokenB: 'DFI',
      priceRatio: [1, 5],
    },
  });
});
