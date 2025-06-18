import { TestBed } from '@angular/core/testing';

import { MapTileLayerService } from './map-tile-layer.service';

describe('MapTileLayerService', () => {
  let service: MapTileLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapTileLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
