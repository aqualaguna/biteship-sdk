import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BiteshipConfig } from '../types';

export class HttpClient {
  private client: AxiosInstance;
  private config: Required<Pick<BiteshipConfig, 'baseUrl' | 'timeout'>>;

  constructor(config: BiteshipConfig) {
    this.config = {
      baseUrl: config.baseUrl || 'https://api.biteship.com',
      timeout: config.timeout || 30000,
    };

    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.apiKey,
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // API returned an error response
          return Promise.reject({
            message: error.response.data?.message || error.message,
            status: error.response.status,
            data: error.response.data,
          });
        } else if (error.request) {
          // Request was made but no response received
          return Promise.reject({
            message: 'No response received from server',
            status: 0,
          });
        } else {
          // Something else happened
          return Promise.reject({
            message: error.message,
            status: 0,
          });
        }
      }
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

