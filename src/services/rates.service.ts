import { HttpClient } from '../http/client';
import { RatesRequest, RatesResponse } from '../types';

export class RatesService {
  constructor(private http: HttpClient) {}

  /**
   * Get shipping rates for couriers
   * @param request - Rates request parameters
   * @returns Promise with rates response
   */
  async getRates(request: RatesRequest): Promise<RatesResponse> {
    return this.http.post<RatesResponse>('/v1/rates/couriers', request);
  }
}

