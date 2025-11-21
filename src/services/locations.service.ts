import { HttpClient } from '../http/client';
import {
  CreateLocationRequest,
  UpdateLocationRequest,
  LocationResponse,
  UpdateLocationResponse,
} from '../types';

export class LocationsService {
  constructor(private http: HttpClient) {}

  /**
   * Create a new location
   * @param request - Location creation data
   * @returns Promise with location response
   */
  async create(request: CreateLocationRequest): Promise<LocationResponse> {
    return this.http.post<LocationResponse>('/v1/locations', request);
  }

  /**
   * Get a location by ID
   * @param id - Location ID
   * @returns Promise with location response
   */
  async get(id: string): Promise<LocationResponse> {
    return this.http.get<LocationResponse>(`/v1/locations/${id}`);
  }

  /**
   * Update a location
   * @param id - Location ID
   * @param request - Location update data
   * @returns Promise with update response
   */
  async update(
    id: string,
    request: UpdateLocationRequest
  ): Promise<UpdateLocationResponse> {
    return this.http.post<UpdateLocationResponse>(`/v1/locations/${id}`, request);
  }

  /**
   * Delete a location
   * @param id - Location ID
   * @returns Promise with response
   */
  async delete(id: string): Promise<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`/v1/locations/${id}`);
  }
}

