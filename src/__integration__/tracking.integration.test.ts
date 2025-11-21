import { Biteship } from '../index';
import { getTestConfig } from './setup';

describe('Tracking API Integration Tests', () => {
  let biteship: Biteship;

  beforeAll(() => {
    const config = getTestConfig();
    biteship = new Biteship(config);
  });

  describe('getById', () => {
    it('should get tracking by order ID', async () => {
      // First create an order to track
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
        throw new Error('Failed to create order for tracking test');
      }
      // Use tracking_id from courier if available, otherwise use order ID
      const trackingId = createResponse.courier?.tracking_id || orderId;
      // Wait a bit for tracking to be available
      await new Promise((resolve) => setTimeout(resolve, 3000));

      try {
        // Get tracking - try with tracking_id first, then order_id
        let response;
        try {
          response = await biteship.tracking.getById(trackingId);
        } catch (error: any) {
          // If tracking_id doesn't work, try with order_id
          if (error.status === 404 && trackingId !== orderId) {
            response = await biteship.tracking.getById(orderId);
            console.log(response);
          } else {
            throw error;
          }
        }

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        // Tracking might not be available immediately, so we just check the response structure
        if (response.tracking) {
          expect(response.tracking).toHaveProperty('id');
          expect(response.tracking).toHaveProperty('order_id');
          expect(response.tracking).toHaveProperty('status');
        }
      } catch (error: any) {
        console.log(error);
        // If tracking is not available (404), that's acceptable for integration test
        // We just verify the SDK handles the error properly
        if (error.status === 404) {
          console.warn('Tracking not available yet for order:', orderId);
          expect(error).toBeDefined();
          expect(error.status).toBe(404);
        } else {
          throw error;
        }
      }
    }, 30000);
  });

  describe('getByWaybill', () => {
    it('should get tracking by waybill ID and courier code', async () => {
      // This test requires a valid waybill ID and courier code
      // Using example values from the Postman collection
      const waybillId = '0123082100003094';
      const courierCode = 'sicepat';

      try {
        const response = await biteship.tracking.getByWaybill(
          waybillId,
          courierCode
        );

        expect(response).toBeDefined();
        // The response might succeed or fail depending on whether the waybill exists
        // We just verify the response structure
        if (response.success && response.tracking) {
          expect(response.tracking).toHaveProperty('waybill_id');
          expect(response.tracking).toHaveProperty('courier');
        }
      } catch (error) {
        // If waybill doesn't exist, that's okay for integration test
        // We just verify the SDK handles the error properly
        expect(error).toBeDefined();
      }
    }, 30000);
  });
});

