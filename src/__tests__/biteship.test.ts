import { Biteship } from '../index';

describe('Biteship SDK', () => {
  const apiKey = 'test-api-key';

  it('should create a Biteship instance with valid config', () => {
    const biteship = new Biteship({ apiKey });
    expect(biteship).toBeInstanceOf(Biteship);
    expect(biteship.rates).toBeDefined();
    expect(biteship.couriers).toBeDefined();
    expect(biteship.locations).toBeDefined();
    expect(biteship.maps).toBeDefined();
    expect(biteship.draftOrders).toBeDefined();
    expect(biteship.orders).toBeDefined();
    expect(biteship.tracking).toBeDefined();
  });

  it('should throw error if API key is missing', () => {
    expect(() => {
      new Biteship({ apiKey: '' });
    }).toThrow('API key is required');
  });

  it('should use custom base URL if provided', () => {
    const customUrl = 'https://custom-api.biteship.com';
    const biteship = new Biteship({ apiKey, baseUrl: customUrl });
    expect(biteship).toBeInstanceOf(Biteship);
  });

  it('should use custom timeout if provided', () => {
    const biteship = new Biteship({ apiKey, timeout: 60000 });
    expect(biteship).toBeInstanceOf(Biteship);
  });
});

