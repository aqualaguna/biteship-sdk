import { HttpClient } from '../http/client';
import { CouriersResponse } from '../types';

export class CouriersService {
  constructor(private http: HttpClient) {}

  /**
   * Get list of available couriers
   * @returns Promise with couriers response
   */
  async list(): Promise<CouriersResponse> {
    return this.http.get<CouriersResponse>('/v1/couriers');
  }
}

