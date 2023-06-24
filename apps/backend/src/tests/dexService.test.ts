import { DexService } from '@/models/DexService';

describe('getPool function', () => {
  it('returns correct values based on input', async () => {
    const response = DexService.getPool('DFI-ETH');
    expect(response).toEqual({
      symbol: 'ETH-DFI',
      tokenA: 'ETH',
      tokenB: 'DFI',
      priceRatio: expect.any(Array), // Don't want to hardcode the values in case the DB changes
    });
  });

  it('should work with both orders (ETH-DFI & DFI-ETH)', async () => {
    const res1 = DexService.getPool('ETH-DFI');
    const res2 = DexService.getPool('ETH-DFI');

    expect(res1).toEqual(res2);
  });
});

describe('validateInput function', () => {
  it('returns true with correct pair', async () => {
    const response = DexService.validateInputs('ETH', 'DFI');
    expect(response[0]).toBe(true);
    expect(response[1]).toBe('');
  });

  it('is not case sensitive', async () => {
    const response = DexService.validateInputs('etH', 'dFI');
    expect(response[0]).toBe(true);
    expect(response[1]).toBe('');
  });

  it('returns false with missing input pair', async () => {
    const response = DexService.validateInputs('ETH', '');
    expect(response[0]).toBe(false);
    expect(response[1]).toBe('Invalid tokens!');
  });

  it('returns false with invalid input pair', async () => {
    const response = DexService.validateInputs('ETH', 'Dragon Coin');
    expect(response[0]).toBe(false);
    expect(response[1]).toBe('Invalid tokens!');
  });

  it('returns false if both inputs are the same', async () => {
    const response = DexService.validateInputs('ETH', 'eth');
    expect(response[0]).toBe(false);
    expect(response[1]).toBe('Tokens must be different!');
  });
});
