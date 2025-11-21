import { Biteship } from '../index';
import { getTestConfig } from './setup';

describe('Draft Orders API Integration Tests', () => {
  let biteship: Biteship;
  let createdDraftOrderId: string | null = null;

  beforeAll(() => {
    const config = getTestConfig();
    biteship = new Biteship(config);
  });

  afterAll(async () => {
    // Clean up: delete created draft order if it exists
    if (createdDraftOrderId) {
      try {
        await biteship.draftOrders.delete(createdDraftOrderId);
      } catch (error) {
        // Ignore cleanup errors
        console.warn('Failed to cleanup test draft order:', error);
      }
    }
  });

  describe('create', () => {
    it('should create a draft order by postal code', async () => {
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

      const response = await biteship.draftOrders.create(request);
      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.id).toBeDefined();
      expect(response.origin).toBeDefined();
      expect(response.destination).toBeDefined();
      expect(response.items).toBeDefined();
      expect(Array.isArray(response.items)).toBe(true);
      expect(response.items.length).toBeGreaterThan(0);

      createdDraftOrderId = response.id || null;
    }, 30000);

    it('should create a draft order by coordinates', async () => {
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

      const response = await biteship.draftOrders.create(request);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.id).toBeDefined();

      // Clean up
      if (response.id) {
        try {
          await biteship.draftOrders.delete(response.id);
        } catch (error) {
          console.warn('Failed to cleanup test draft order:', error);
        }
      }
    }, 30000);
  });

  describe('get', () => {
    it('should get a draft order by ID', async () => {
      // First create a draft order
      const createRequest = {
        origin_contact_name: 'Test Origin',
        origin_contact_phone: '081234567890',
        origin_address: 'Test Address',
        origin_postal_code: 12440,
        destination_contact_name: 'Test Destination',
        destination_contact_phone: '088888888888',
        destination_address: 'Test Destination Address',
        destination_postal_code: 12950,
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

      const createResponse = await biteship.draftOrders.create(createRequest);
      const draftOrderId = createResponse.id;

      if (!draftOrderId) {
        throw new Error('Failed to create draft order for get test');
      }

      try {
        // Get the draft order
        const response = await biteship.draftOrders.get(draftOrderId);

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.id).toBeDefined();
        expect(response.id).toBe(draftOrderId);
      } finally {
        // Clean up
        try {
          await biteship.draftOrders.delete(draftOrderId);
        } catch (error) {
          console.warn('Failed to cleanup test draft order:', error);
        }
      }
    }, 30000);
  });

  describe('update', () => {
    it('should update courier of a draft order', async () => {
      // First create a draft order
      const createRequest = {
        origin_contact_name: 'Test Origin',
        origin_contact_phone: '081234567890',
        origin_address: 'Test Address',
        origin_postal_code: 12440,
        destination_contact_name: 'Test Destination',
        destination_contact_phone: '088888888888',
        destination_address: 'Test Destination Address',
        destination_postal_code: 12950,
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

      const createResponse = await biteship.draftOrders.create(createRequest);
      const draftOrderId = createResponse.id;

      if (!draftOrderId) {
        throw new Error('Failed to create draft order for update test');
      }

      try {
        // Update the courier
        const updateRequest = {
          courier_company: 'sicepat',
          courier_type: 'reg',
        };

        const response = await biteship.draftOrders.update(
          draftOrderId,
          updateRequest
        );

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.id).toBeDefined();
      } finally {
        // Clean up
        try {
          await biteship.draftOrders.delete(draftOrderId);
        } catch (error) {
          console.warn('Failed to cleanup test draft order:', error);
        }
      }
    }, 30000);
  });

  describe('getRates', () => {
    it('should get rates for a draft order', async () => {
      // First create a draft order
      const createRequest = {
        origin_contact_name: 'Test Origin',
        origin_contact_phone: '081234567890',
        origin_address: 'Test Address',
        origin_postal_code: 12440,
        destination_contact_name: 'Test Destination',
        destination_contact_phone: '088888888888',
        destination_address: 'Test Destination Address',
        destination_postal_code: 12950,
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

      const createResponse = await biteship.draftOrders.create(createRequest);
      const draftOrderId = createResponse.id;

      if (!draftOrderId) {
        throw new Error('Failed to create draft order for rates test');
      }

      try {
        // Get rates
        const response = await biteship.draftOrders.getRates(draftOrderId);

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.pricing).toBeDefined();
        expect(Array.isArray(response.pricing)).toBe(true);
      } finally {
        // Clean up
        try {
          await biteship.draftOrders.delete(draftOrderId);
        } catch (error) {
          console.warn('Failed to cleanup test draft order:', error);
        }
      }
    }, 30000);
  });

  describe('delete', () => {
    it('should delete a draft order', async () => {
      // First create a draft order
      const createRequest = {
        origin_contact_name: 'Test Origin',
        origin_contact_phone: '081234567890',
        origin_address: 'Test Address',
        origin_postal_code: 12440,
        destination_contact_name: 'Test Destination',
        destination_contact_phone: '088888888888',
        destination_address: 'Test Destination Address',
        destination_postal_code: 12950,
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

      const createResponse = await biteship.draftOrders.create(createRequest);
      const draftOrderId = createResponse.id;

      if (!draftOrderId) {
        throw new Error('Failed to create draft order for delete test');
      }

      // Delete the draft order
      const response = await biteship.draftOrders.delete(draftOrderId);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
    }, 30000);
  });
});

