import { TestBed } from '@angular/core/testing';

import { ChartRenderService } from './chart-render.service';

describe('ChartRenderService', () => {
  let service: ChartRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
