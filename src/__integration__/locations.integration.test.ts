import { Biteship } from '../index';
import { getTestConfig } from './setup';

describe('Locations API Integration Tests', () => {
  let biteship: Biteship;
  let createdLocationId: string | null = null;

  beforeAll(() => {
    const config = getTestConfig();
    biteship = new Biteship(config);
  });

  afterAll(async () => {
    // Clean up: delete created location if it exists
    if (createdLocationId) {
      try {
        await biteship.locations.delete(createdLocationId);
      } catch (error) {
        // Ignore cleanup errors
        console.warn('Failed to cleanup test location:', error);
      }
    }
  });

  describe('create', () => {
    it('should create a location with coordinates', async () => {
      const request = {
        name: 'Test Warehouse',
        contact_name: 'John Doe',
        contact_phone: '08123456789',
        address: 'Jl. Test No. 123, Jakarta',
        note: 'Integration test location',
        postal_code: 10110,
        latitude: -6.232123121,
        longitude: 102.22189911,
        type: 'origin' as const,
      };

      const response = await biteship.locations.create(request);
      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.id).toBeDefined();
      expect(response.name).toBe(request.name);
      expect(response.contact_name).toBe(request.contact_name);
      expect(response.contact_phone).toBe(request.contact_phone);
      expect(response.address).toBe(request.address);
      expect(response.postal_code).toBe(request.postal_code);
      expect(response.type).toBe(request.type);

      createdLocationId = response.id || null;
    }, 30000);

    it('should create a location without coordinates', async () => {
      const request = {
        name: 'Test Warehouse 2',
        contact_name: 'Jane Doe',
        contact_phone: '08123456790',
        address: 'Jl. Test No. 456, Jakarta',
        postal_code: 10110,
        type: 'origin' as const,
      };

      const response = await biteship.locations.create(request);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.id).toBeDefined();
      expect(response.name).toBe(request.name);

      // Clean up
      if (response.id) {
        try {
          await biteship.locations.delete(response.id);
        } catch (error) {
          console.warn('Failed to cleanup test location:', error);
        }
      }
    }, 30000);
  });

  describe('get', () => {
    it('should get a location by ID', async () => {
      // First create a location
      const createRequest = {
        name: 'Test Get Location',
        contact_name: 'Test User',
        contact_phone: '08123456791',
        address: 'Jl. Test Get',
        postal_code: 10110,
        type: 'origin' as const,
      };

      const createResponse = await biteship.locations.create(createRequest);
      const locationId = createResponse.id;

      if (!locationId) {
        throw new Error('Failed to create location for get test');
      }

      try {
        // Get the location
        const response = await biteship.locations.get(locationId);

        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.id).toBe(locationId);
        expect(response.name).toBe(createRequest.name);
      } finally {
        // Clean up
        try {
          await biteship.locations.delete(locationId);
        } catch (error) {
          console.warn('Failed to cleanup test location:', error);
        }
      }
    }, 30000);
  });

  describe('update', () => {
    it('should update a location', async () => {
      // First create a location
      const createRequest = {
        name: 'Test Update Location',
        contact_name: 'Test User',
        contact_phone: '08123456792',
        address: 'Jl. Test Update',
        postal_code: 10110,
        type: 'origin' as const,
      };

      const createResponse = await biteship.locations.create(createRequest);
      const locationId = createResponse.id;

      if (!locationId) {
        throw new Error('Failed to create location for update test');
      }

      try {
        // Update the location
        const updateRequest = {
          name: 'Updated Location Name',
        };

        const response = await biteship.locations.update(locationId, updateRequest);
        expect(response).toBeDefined();
        expect(response.success).toBe(true);
        expect(response.message).toBeDefined();
        
        // Verify the update by fetching the location again
        const updatedLocation = await biteship.locations.get(locationId);
        expect(updatedLocation.name).toBe(updateRequest.name);
      } finally {
        // Clean up
        try {
          await biteship.locations.delete(locationId);
        } catch (error) {
          console.warn('Failed to cleanup test location:', error);
        }
      }
    }, 30000);
  });

  describe('delete', () => {
    it('should delete a location', async () => {
      // First create a location
      const createRequest = {
        name: 'Test Delete Location',
        contact_name: 'Test User',
        contact_phone: '08123456793',
        address: 'Jl. Test Delete',
        postal_code: 10110,
        type: 'origin' as const,
      };

      const createResponse = await biteship.locations.create(createRequest);
      const locationId = createResponse.id;

      if (!locationId) {
        throw new Error('Failed to create location for delete test');
      }

      // Delete the location
      const response = await biteship.locations.delete(locationId);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
    }, 30000);
  });
});

