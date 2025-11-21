import { Biteship } from '../index';
import { getTestConfig } from './setup';
import { RatesRequest } from '../types';

describe('Rates API Integration Tests', () => {
  let biteship: Biteship;

  beforeAll(() => {
    const config = getTestConfig();
    biteship = new Biteship(config);
  });

  describe('getRates', () => {
    it('should get rates by postal code', async () => {
      const request: RatesRequest = {
        origin_postal_code: 12530,
        destination_postal_code: 10110,
        couriers: 'jne,sicepat',
        items: [
          {
            name: 'Test Product',
            description: 'Integration test product',
            value: 100000,
            quantity: 1,
            length: 10,
            width: 10,
            height: 10,
            weight: 1000,
          },
        ],
      };

      const response = await biteship.rates.getRates(request);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.pricing).toBeDefined();
      expect(Array.isArray(response.pricing)).toBe(true);
    }, 30000);

    it('should get rates by area ID', async () => {
      const request: RatesRequest = {
        origin_area_id: 'IDNP6IDNC148IDND836IDZ12410',
        destination_area_id: 'IDNP6IDNC148IDND836IDZ12430',
        couriers: 'paxel,jne,sicepat',
        items: [
          {
            name: 'Shoes',
            description: 'Black colored size 45',
            value: 199000,
            length: 30,
            width: 15,
            height: 20,
            weight: 200,
            quantity: 2,
          },
        ],
      };

      const response = await biteship.rates.getRates(request);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.pricing).toBeDefined();
    }, 30000);

    it('should get rates by coordinates', async () => {
      const request: RatesRequest = {
        origin_latitude: -6.291974,
        origin_longitude: 106.801207,
        destination_latitude: -6.288941,
        destination_longitude: 106.806473,
        couriers: 'grab,gojek',
        items: [
          {
            name: 'Polaris Coffee Cream 330ml isi 3 pcs',
            description: '',
            length: 10,
            width: 10,
            height: 0,
            weight: 1000,
            value: 285600,
            quantity: 1,
          },
        ],
      };

      const response = await biteship.rates.getRates(request);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.pricing).toBeDefined();
    }, 30000);
  });
});

