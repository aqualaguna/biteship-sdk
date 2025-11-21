import { HttpClient } from '../http/client';
import { GetAreasRequest, AreasResponse } from '../types';

export class MapsService {
  constructor(private http: HttpClient) {}

  /**
   * Get areas/locations by search query
   * @param request - Areas search parameters
   * @returns Promise with areas response
   */
  async getAreas(request: GetAreasRequest): Promise<AreasResponse> {
    const params = new URLSearchParams({
      countries: request.countries,
      input: request.input,
      type: request.type,
    });
    return this.http.get<AreasResponse>(`/v1/maps/areas?${params.toString()}`);
  }
}

