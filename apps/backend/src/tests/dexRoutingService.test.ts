import { DexRoutingService } from '@/models/DexRoutingService';

describe('listAllRoutes function', () => {
  it('returns correct values based on input', async () => {
    const response = await DexRoutingService.listAllRoutes('ETH', 'DFI');
    expect(response).toEqual({
      fromToken: 'ETH',
      toToken: 'DFI',
      routes: expect.arrayContaining([
        // Don't want to hardcode the values in case the DB changes
        expect.arrayContaining([
          expect.objectContaining({
            symbol: expect.any(String),
            tokenA: expect.any(String),
            tokenB: expect.any(String),
            priceRatio: expect.arrayContaining([expect.any(Number), expect.any(Number)]),
          }),
        ]),
      ]),
    });
  });

  it('returns empty array for a pair that doesnt exist', async () => {
    const response = await DexRoutingService.listAllRoutes('ETH', 'XTZ');
    expect(response).toEqual({
      fromToken: 'ETH',
      toToken: 'XTZ',
      routes: [],
    });
  });
});

describe('getBestRoute function', () => {
  it('returns correct values based on input', async () => {
    const response = await DexRoutingService.getBestRoute('ETH', 'DFI');
    expect(response).toEqual({
      fromToken: 'ETH',
      toToken: 'DFI',
      bestRoute: expect.arrayContaining([
        // Don't want to hardcode the values in case the DB changes
        expect.objectContaining({
          symbol: expect.any(String),
          tokenA: expect.any(String),
          tokenB: expect.any(String),
          priceRatio: expect.arrayContaining([expect.any(Number), expect.any(Number)]),
        }),
      ]),
      estimatedReturn: expect.any(Number), // Don't want to hardcode the values in case the DB changes
    });
  });

  it('returns empty array and 0 for a pair that doesnt exist', async () => {
    const response = await DexRoutingService.getBestRoute('ETH', 'XTZ');
    expect(response).toEqual({
      fromToken: 'ETH',
      toToken: 'XTZ',
      bestRoute: [],
      estimatedReturn: 0,
    });
  });
});
