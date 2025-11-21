import { RatesService } from '../../services/rates.service';
import { HttpClient } from '../../http/client';
import { RatesRequest } from '../../types';

describe('RatesService', () => {
  let ratesService: RatesService;
  let httpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClient = {
      post: jest.fn(),
    } as any;

    ratesService = new RatesService(httpClient);
  });

  it('should get rates successfully', async () => {
    const request: RatesRequest = {
      origin_postal_code: 12530,
      destination_postal_code: 10110,
      couriers: 'jne,sicepat',
      items: [
        {
          name: 'Test Item',
          value: 100000,
          quantity: 1,
          length: 10,
          width: 10,
          height: 10,
          weight: 1000,
        },
      ],
    };

    const mockResponse = {
      success: true,
      pricing: [],
    };

    httpClient.post.mockResolvedValue(mockResponse);

    const result = await ratesService.getRates(request);

    expect(httpClient.post).toHaveBeenCalledWith(
      '/v1/rates/couriers',
      request
    );
    expect(result).toEqual(mockResponse);
  });
});

