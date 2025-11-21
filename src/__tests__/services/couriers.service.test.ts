import { CouriersService } from '../../services/couriers.service';
import { HttpClient } from '../../http/client';

describe('CouriersService', () => {
  let couriersService: CouriersService;
  let httpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    } as any;

    couriersService = new CouriersService(httpClient);
  });

  it('should list couriers successfully', async () => {
    const mockResponse = {
      success: true,
      couriers: [
        {
          courier_name: 'JNE',
          courier_code: 'jne',
          courier_service_name: 'Regular',
          courier_service_code: 'reg',
          description: 'Regular delivery service',
          service_type: 'standard',
          shipping_type: 'parcel',
          tier: 'standard',
          shipment_duration_range: '2 - 5',
          shipment_duration_unit: 'days',
          available_collection_method: ['pickup'],
          available_for_cash_on_delivery: true,
          available_for_proof_of_delivery: true,
          available_for_instant_waybill_id: false,
        },
      ],
    };

    httpClient.get.mockResolvedValue(mockResponse);

    const result = await couriersService.list();

    expect(httpClient.get).toHaveBeenCalledWith('/v1/couriers');
    expect(result).toEqual(mockResponse);
  });
});

