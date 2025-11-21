import { LocationsService } from '../../services/locations.service';
import { HttpClient } from '../../http/client';
import { CreateLocationRequest, UpdateLocationRequest } from '../../types';

describe('LocationsService', () => {
  let locationsService: LocationsService;
  let httpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClient = {
      post: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    } as any;

    locationsService = new LocationsService(httpClient);
  });

  it('should create location successfully', async () => {
    const request: CreateLocationRequest = {
      name: 'Test Location',
      contact_name: 'John Doe',
      contact_phone: '08123456789',
      address: 'Test Address',
      postal_code: 10110,
      type: 'origin',
    };

    const mockResponse = {
      success: true,
      id: 'test-id',
      ...request,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    httpClient.post.mockResolvedValue(mockResponse);

    const result = await locationsService.create(request);

    expect(httpClient.post).toHaveBeenCalledWith('/v1/locations', request);
    expect(result).toEqual(mockResponse);
  });

  it('should get location by id successfully', async () => {
    const locationId = 'test-id';
    const mockResponse = {
      success: true,
      id: locationId,
      name: 'Test Location',
      contact_name: 'John Doe',
      contact_phone: '08123456789',
      address: 'Test Address',
      postal_code: 10110,
      type: 'origin' as const,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    };

    httpClient.get.mockResolvedValue(mockResponse);

    const result = await locationsService.get(locationId);

    expect(httpClient.get).toHaveBeenCalledWith(`/v1/locations/${locationId}`);
    expect(result).toEqual(mockResponse);
  });

  it('should update location successfully', async () => {
    const locationId = 'test-id';
    const request: UpdateLocationRequest = {
      name: 'Updated Location',
    };

    const mockResponse = {
      success: true,
      message: 'Location detail has been updated',
    };

    httpClient.post.mockResolvedValue(mockResponse);

    const result = await locationsService.update(locationId, request);

    expect(httpClient.post).toHaveBeenCalledWith(
      `/v1/locations/${locationId}`,
      request
    );
    expect(result).toEqual(mockResponse);
  });

  it('should delete location successfully', async () => {
    const locationId = 'test-id';
    const mockResponse = {
      success: true,
    };

    httpClient.delete.mockResolvedValue(mockResponse);

    const result = await locationsService.delete(locationId);

    expect(httpClient.delete).toHaveBeenCalledWith(
      `/v1/locations/${locationId}`
    );
    expect(result).toEqual(mockResponse);
  });
});

