import { Biteship } from '../index';
import { getTestConfig } from './setup';

describe('Maps API Integration Tests', () => {
  let biteship: Biteship;

  beforeAll(() => {
    const config = getTestConfig();
    biteship = new Biteship(config);
  });

  describe('getAreas', () => {
    it('should get areas by search query (single)', async () => {
      const request = {
        countries: 'ID',
        input: 'Jakarta Selatan',
        type: 'single' as const,
      };

      const response = await biteship.maps.getAreas(request);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.areas).toBeDefined();
      expect(Array.isArray(response.areas)).toBe(true);
    }, 30000);

    it('should get areas by search query (multiple)', async () => {
      const request = {
        countries: 'ID',
        input: 'Jakarta',
        type: 'multiple' as const,
      };

      const response = await biteship.maps.getAreas(request);

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
      expect(response.areas).toBeDefined();
      expect(Array.isArray(response.areas)).toBe(true);
    }, 30000);

    it('should handle invalid search query gracefully', async () => {
      const request = {
        countries: 'ID',
        input: 'InvalidLocationName12345',
        type: 'single' as const,
      };

      const response = await biteship.maps.getAreas(request);

      // API might return empty array or error
      expect(response).toBeDefined();
      expect(response.areas).toBeDefined();
      expect(Array.isArray(response.areas)).toBe(true);
    }, 30000);
  });
});

