import { TestBed } from '@angular/core/testing';
import { WeatherUtilService } from './weather-util.service';

describe('WeatherUtilService', () => {
  let service: WeatherUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate average correctly', () => {
    expect(service.average([1, 2, 3, 4, 5])).toBe(3);
    expect(service.average([10, 20])).toBe(15);
    expect(service.average([])).toBe(0);
  });

  it('should format date correctly', () => {
    const testDate = new Date('2025-06-18');
    expect(service.formatDate(testDate)).toBe('2025-06-18');
  });

  it('should get past date correctly', () => {
    const today = new Date('2025-06-18');
    jasmine.clock().mockDate(today);
    
    const threeDaysAgo = service.getPastDate(3);
    expect(service.formatDate(threeDaysAgo)).toBe('2025-06-15');
  });
});
