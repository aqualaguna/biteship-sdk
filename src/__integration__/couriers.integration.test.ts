import { Biteship } from '../index';
import { getTestConfig } from './setup';

describe('Couriers API Integration Tests', () => {
  let biteship: Biteship;

  beforeAll(() => {
    const config = getTestConfig();
    biteship = new Biteship(config);
  });

  describe('list', () => {
    it('should get list of available couriers', async () => {
      const response = await biteship.couriers.list();
      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.couriers).toBeDefined();
      expect(Array.isArray(response.couriers)).toBe(true);
      expect(response.couriers.length).toBeGreaterThan(0);
      
      // Check courier structure
      if (response.couriers.length > 0) {
        const courier = response.couriers[0];
        expect(courier).toHaveProperty('courier_name');
        expect(courier).toHaveProperty('courier_code');
        expect(courier).toHaveProperty('courier_service_name');
        expect(courier).toHaveProperty('courier_service_code');
        expect(courier).toHaveProperty('service_type');
        expect(courier).toHaveProperty('shipping_type');
        expect(courier).toHaveProperty('available_collection_method');
        expect(Array.isArray(courier.available_collection_method)).toBe(true);
        expect(typeof courier.available_for_cash_on_delivery).toBe('boolean');
        expect(typeof courier.available_for_proof_of_delivery).toBe('boolean');
        expect(typeof courier.available_for_instant_waybill_id).toBe('boolean');
      }
    }, 30000);
  });
});

