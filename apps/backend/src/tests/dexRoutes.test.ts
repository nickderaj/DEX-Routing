import app from '@/app';
import { availableSymbols, availableTokens, poolPairs } from '@/db/PoolDb';
import { StatusEnum } from '@/types/ApiTypes';
import request from 'supertest';

describe('health check', () => {
  it('should return OK for the health check route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(StatusEnum.OK);
    expect(response.body).toEqual({ message: 'OK' });
  });
});

describe('list-all routes', () => {
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
});

describe('should get routes by from and to token', () => {
  it('should get routes for valid combination', async () => {
    const response = await request(app).get('/api/v1/routes/from/ETH/to/DFI');
    expect(response.status).toBe(StatusEnum.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Fetched routes successfully!',
        data: expect.objectContaining({
          routes: expect.any(Array), // don't want to hard code the values as it might change as the DB grows
        }),
      }),
    );
  });

  it('should return 404 if from and to are the same', async () => {
    const response = await request(app).get('/api/v1/routes/from/ETH/to/ETH');
    expect(response.status).toBe(StatusEnum.NOT_FOUND);
    expect(response.body).toEqual({ message: 'Tokens must be different!' });
  });

  it('should return 404 if there is a missing parameter', async () => {
    const response = await request(app).get('/api/v1/routes/from/ETH/to/');
    expect(response.status).toBe(StatusEnum.NOT_FOUND);
  });

  it('should return 404 for invalid combination', async () => {
    const response = await request(app).get('/api/v1/routes/from/AVAX/to/ETH');
    expect(response.status).toBe(StatusEnum.NOT_FOUND);
    expect(response.body).toEqual({ message: 'No route found!' });
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

  it('should not get routes by invalid pool pair', async () => {
    const response = await request(app).get('/api/v1/routes/from/AVAX/to/DFI/AVAX-DFI');
    expect(response.status).toBe(StatusEnum.NOT_FOUND);
    expect(response.body).toEqual({
      message: 'Invalid pool pair!',
    });
  });
});
