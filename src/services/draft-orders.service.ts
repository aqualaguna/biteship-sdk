import { HttpClient } from '../http/client';
import {
  CreateDraftOrderRequest,
  UpdateDraftOrderRequest,
  DraftOrderResponse,
  RatesResponse,
} from '../types';

export class DraftOrdersService {
  constructor(private http: HttpClient) {}

  /**
   * Create a draft order
   * @param request - Draft order creation data
   * @returns Promise with draft order response
   */
  async create(
    request: CreateDraftOrderRequest
  ): Promise<DraftOrderResponse> {
    return this.http.post<DraftOrderResponse>('/v1/draft_orders', request);
  }

  /**
   * Get a draft order by ID
   * @param id - Draft order ID
   * @returns Promise with draft order response
   */
  async get(id: string): Promise<DraftOrderResponse> {
    return this.http.get<DraftOrderResponse>(`/v1/draft_orders/${id}`);
  }

  /**
   * Update a draft order
   * @param id - Draft order ID
   * @param request - Draft order update data
   * @returns Promise with draft order response
   */
  async update(
    id: string,
    request: UpdateDraftOrderRequest
  ): Promise<DraftOrderResponse> {
    return this.http.post<DraftOrderResponse>(`/v1/draft_orders/${id}`, request);
  }

  /**
   * Delete a draft order
   * @param id - Draft order ID
   * @returns Promise with response
   */
  async delete(id: string): Promise<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`/v1/draft_orders/${id}`);
  }

  /**
   * Confirm a draft order (convert to order)
   * @param id - Draft order ID
   * @returns Promise with order response
   */
  async confirm(id: string): Promise<DraftOrderResponse> {
    return this.http.post<DraftOrderResponse>(
      `/v1/draft_orders/${id}/confirm`
    );
  }

  /**
   * Get rates for a draft order
   * @param id - Draft order ID
   * @returns Promise with rates response
   */
  async getRates(id: string): Promise<RatesResponse> {
    return this.http.get<RatesResponse>(`/v1/draft_orders/${id}/rates`);
  }
}

