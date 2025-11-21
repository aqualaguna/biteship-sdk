import { HttpClient } from './http/client';
import { RatesService } from './services/rates.service';
import { CouriersService } from './services/couriers.service';
import { LocationsService } from './services/locations.service';
import { MapsService } from './services/maps.service';
import { DraftOrdersService } from './services/draft-orders.service';
import { OrdersService } from './services/orders.service';
import { TrackingService } from './services/tracking.service';
import { BiteshipConfig } from './types';

/**
 * Biteship SDK - Main class for interacting with Biteship API
 */
export class Biteship {
  public readonly rates: RatesService;
  public readonly couriers: CouriersService;
  public readonly locations: LocationsService;
  public readonly maps: MapsService;
  public readonly draftOrders: DraftOrdersService;
  public readonly orders: OrdersService;
  public readonly tracking: TrackingService;

  private http: HttpClient;

  /**
   * Create a new Biteship SDK instance
   * @param config - SDK configuration
   */
  constructor(config: BiteshipConfig) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }

    this.http = new HttpClient(config);

    // Initialize services
    this.rates = new RatesService(this.http);
    this.couriers = new CouriersService(this.http);
    this.locations = new LocationsService(this.http);
    this.maps = new MapsService(this.http);
    this.draftOrders = new DraftOrdersService(this.http);
    this.orders = new OrdersService(this.http);
    this.tracking = new TrackingService(this.http);
  }
}

// Export all types
export * from './types';

// Default export
export default Biteship;

