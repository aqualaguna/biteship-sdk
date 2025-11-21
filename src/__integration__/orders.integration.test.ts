import { Biteship } from '../index';
import { getTestConfig } from './setup';

describe('Orders API Integration Tests', () => {
  let biteship: Biteship;

  beforeAll(() => {
    const config = getTestConfig();
    biteship = new Biteship(config);
  });

  describe('create', () => {
    it('should create an order by postal code', async () => {
      const request = {
        origin_contact_name: 'Test Origin',
        origin_contact_phone: '081234567890',
        origin_address: 'Plaza Senayan, Jakarta',
        origin_postal_code: 12440,
        destination_contact_name: 'Test Destination',
        destination_contact_phone: '088888888888',
        destination_contact_email: 'test@example.com',
        destination_address: 'Lebak Bulus, Jakarta',
        destination_postal_code: 12950,
        courier_company: 'jne',
        courier_type: 'reg',
        delivery_type: 'now' as const,
        items: [
          {
            name: 'Test Product',
            description: 'Integration test product',
            category: 'fashion',
            value: 165000,
            quantity: 1,
            height: 10,
            length: 10,
            weight: 200,
            width: 10,
          },
        ],
      };

      const response = await biteship.orders.create(request);
      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.id).toBeDefined();
      expect(response.status).toBeDefined();
      expect(response.courier).toBeDefined();
      expect(response.items).toBeDefined();
      expect(Array.isArray(response.items)).toBe(true);
    }, 30000);

    it('should create an order by coordinates', async () => {
      const request = {
        origin_contact_name: 'Test Origin',
        origin_contact_phone: '081234567890',
        origin_address: 'Plaza Senayan, Jakarta',
        origin_coordinate: {
          latitude: -6.2253114,
          longitude: 106.7993735,
        },
        destination_contact_name: 'Test Destination',
        destination_contact_phone: '088888888888',
        destination_address: 'Lebak Bulus, Jakarta',
        destination_coordinate: {
          latitude: -6.28927,
          longitude: 106.77492000000007,
        },
        courier_company: 'grab',
        courier_type: 'instant',
        delivery_type: 'now' as const,
        items: [
          {
            name: 'Test Product',
            value: 165000,
            quantity: 1,
            height: 10,
            length: 10,
            weight: 200,
            width: 10,
          },
        ],
      };

      const response = await biteship.orders.create(request);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.id).toBeDefined();
    }, 30000);
  });

  describe('get', () => {
    it('should get an order by ID', async () => {
      // First create an order
      const createRequest = {
        origin_contact_name: 'Test Origin',
        origin_contact_phone: '081234567890',
        origin_address: 'Test Address',
        origin_postal_code: 12440,
        destination_contact_name: 'Test Destination',
        destination_contact_phone: '088888888888',
        destination_address: 'Test Destination Address',
        destination_postal_code: 12950,
        courier_company: 'jne',
        courier_type: 'reg',
        delivery_type: 'now' as const,
        items: [
          {
            name: 'Test Product',
            value: 165000,
            quantity: 1,
            height: 10,
            length: 10,
            weight: 200,
            width: 10,
          },
        ],
      };

      const createResponse = await biteship.orders.create(createRequest);
      const orderId = createResponse.id;

      if (!orderId) {
        throw new Error('Failed to create order for get test');
      }

      // Get the order
      const response = await biteship.orders.get(orderId);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.id).toBeDefined();
      expect(response.id).toBe(orderId);
    }, 30000);
  });

  describe('cancel', () => {
    it('should cancel an order', async () => {
      // First create an order
      const createRequest = {
        origin_contact_name: 'Test Origin',
        origin_contact_phone: '081234567890',
        origin_address: 'Test Address',
        origin_postal_code: 12440,
        destination_contact_name: 'Test Destination',
        destination_contact_phone: '088888888888',
        destination_address: 'Test Destination Address',
        destination_postal_code: 12950,
        courier_company: 'jne',
        courier_type: 'reg',
        delivery_type: 'now' as const,
        items: [
          {
            name: 'Test Product',
            value: 165000,
            quantity: 1,
            height: 10,
            length: 10,
            weight: 200,
            width: 10,
          },
        ],
      };

      const createResponse = await biteship.orders.create(createRequest);
      const orderId = createResponse.id;

      if (!orderId) {
        throw new Error('Failed to create order for cancel test');
      }

      // Wait a bit before canceling (some orders might not be cancelable immediately)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Cancel the order
      const response = await biteship.orders.cancel(orderId);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
    }, 30000);
  });
});

