import app from '@/app';
import { availableTokens } from '@/db/PoolDb';
import { StatusEnum } from '@/types/ApiTypes';
import request from 'supertest';

it('should return OK for the health check route', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(StatusEnum.OK);
  expect(response.body).toEqual({ message: 'OK' });
});

// it('should provide example dex state', async () => {
//   const response = await request(app).get('/api/v1/routes/from/ETH/to/DFI');
//   expect(response.status).toBe(StatusEnum.OK);
//   expect(response.body).toEqual(
//     expect.arrayContaining([
//       expect.objectContaining({ symbol: 'ETH-DFI' }),
//       expect.objectContaining({ symbol: 'BTC-DFI' }),
//       expect.objectContaining({ symbol: 'DOGE-DFI' }),
//       expect.objectContaining({ symbol: 'DOGE-ETH' }),
//       expect.objectContaining({ symbol: 'BTC-ETH' }),
//     ]),
//   );
// });

it('should get pool by symbol', async () => {
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

it('should provide all tokens', async () => {
  const response = await request(app).get('/api/v1/routes/tokens');
  expect(response.status).toBe(StatusEnum.OK);
  expect(response.body).toEqual(
    expect.objectContaining({ message: 'Fetched tokens successfully!', tokens: expect.arrayContaining(availableTokens) }),
  );
});

// This doesn't really test anything, it's just an
// example of how we can simulate different dex states
// it('should provide mocked state', async () => {
//   jest.spyOn(dexService, 'listPools').mockReturnValue([
//     {
//       symbol: 'AAPL-TSLA',
//       tokenA: 'AAPL',
//       tokenB: 'TSLA',
//       priceRatio: [1, 1],
//     },
//     {
//       symbol: 'NFLX-GOOGL',
//       tokenA: 'NFLX',
//       tokenB: 'GOOGL',
//       priceRatio: [7, 13],
//     },
//   ]);

//   const response1 = await request(app).get('api/v1/routes/from/ETH/to/DFI');
//   expect(response1.status).toBe(StatusEnum.OK);
//   expect(response1.body).toEqual([
//     {
//       symbol: 'AAPL-TSLA',
//       tokenA: 'AAPL',
//       tokenB: 'TSLA',
//       priceRatio: [1, 1],
//     },
//     {
//       symbol: 'NFLX-GOOGL',
//       tokenA: 'NFLX',
//       tokenB: 'GOOGL',
//       priceRatio: [7, 13],
//     },
//   ]);

//   const response2 = await request(app).get('/tokens');
//   expect(response2.status).toBe(StatusEnum.OK);
//   expect(response2.body).toEqual(['AAPL', 'TSLA', 'NFLX', 'GOOGL']);

//   const response3 = await request(app).get('api/v1/routes/from/ETH/to/DFI/NFLX-GOOGL');
//   expect(response3.status).toBe(StatusEnum.OK);
//   expect(response3.body).toEqual({
//     symbol: 'NFLX-GOOGL',
//     tokenA: 'NFLX',
//     tokenB: 'GOOGL',
//     priceRatio: [7, 13],
//   });
// });
