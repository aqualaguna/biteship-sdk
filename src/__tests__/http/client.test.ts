import { HttpClient } from '../../http/client';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HttpClient', () => {
  let httpClient: HttpClient;
  const config = {
    apiKey: 'test-api-key',
    baseUrl: 'https://api.biteship.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    const axiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
    };

    mockedAxios.create.mockReturnValue(axiosInstance as any);
    httpClient = new HttpClient(config);
  });

  it('should create axios instance with correct config', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: config.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.apiKey,
      },
    });
  });

  it('should use custom base URL if provided', () => {
    const customUrl = 'https://custom-api.biteship.com';
    const customConfig = { ...config, baseUrl: customUrl };
    mockedAxios.create.mockReturnValue({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    } as any);

    new HttpClient(customConfig);
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: customUrl,
      })
    );
  });
});

