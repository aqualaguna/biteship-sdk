import { HttpClient } from '../http/client';
import { CreateOrderRequest, OrderResponse } from '../types';

export class OrdersService {
  constructor(private http: HttpClient) {}

  /**
   * Create an order
   * @param request - Order creation data
   * @returns Promise with order response
   */
  async create(request: CreateOrderRequest): Promise<OrderResponse> {
    return this.http.post<OrderResponse>('/v1/orders', request);
  }

  /**
   * Get an order by ID
   * @param id - Order ID
   * @returns Promise with order response
   */
  async get(id: string): Promise<OrderResponse> {
    return this.http.get<OrderResponse>(`/v1/orders/${id}`);
  }

  /**
   * Cancel an order
   * @param id - Order ID
   * @returns Promise with response
   */
  async cancel(id: string): Promise<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`/v1/orders/${id}/cancel`);
  }
}

