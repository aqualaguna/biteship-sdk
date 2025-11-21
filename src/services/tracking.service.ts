import { HttpClient } from '../http/client';
import { TrackingResponse } from '../types';

export class TrackingService {
  constructor(private http: HttpClient) {}

  /**
   * Get tracking information by order ID
   * @param id - Order ID
   * @returns Promise with tracking response
   */
  async getById(id: string): Promise<TrackingResponse> {
    return this.http.get<TrackingResponse>(`/v1/trackings/${id}`);
  }

  /**
   * Get tracking information by waybill ID and courier code
   * @param waybillId - Waybill ID
   * @param courierCode - Courier code
   * @returns Promise with tracking response
   */
  async getByWaybill(
    waybillId: string,
    courierCode: string
  ): Promise<TrackingResponse> {
    return this.http.get<TrackingResponse>(
      `/v1/trackings/${waybillId}/couriers/${courierCode}`
    );
  }
}

