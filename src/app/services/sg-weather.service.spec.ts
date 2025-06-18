import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SgWeatherService } from './sg-weather.service';
import { ErrorHandlerService } from './error-handler.service';
import { WeatherForecastData } from '../models/data.types';

describe('SgWeatherService', () => {
  let service: SgWeatherService;
  let httpMock: HttpTestingController;
  let errorHandlerService: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SgWeatherService, ErrorHandlerService]
    });
    service = TestBed.inject(SgWeatherService);
    httpMock = TestBed.inject(HttpTestingController);
    errorHandlerService = TestBed.inject(ErrorHandlerService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch location data successfully', () => {
    const mockData = {
      items: [{
        forecasts: [
          { area: 'Ang Mo Kio', forecast: 'Cloudy' }
        ]
      }],
      area_metadata: [
        {
          name: 'Ang Mo Kio',
          label_location: { latitude: 1.3691, longitude: 103.8454 }
        }
      ]
    };

    service.getLocationData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch weather forecast data successfully', () => {
    const mockForecast: WeatherForecastData = {
      latitude: 1.3691,
      longitude: 103.8454,
      generationtime_ms: 0.12,
      utc_offset_seconds: 28800,
      timezone: 'Asia/Singapore',
      timezone_abbreviation: 'SGT',
      elevation: 10,
      hourly_units: {
        time: 'iso8601',
        temperature_2m: '°C',
        relativehumidity_2m: '%',
        direct_radiation: 'W/m²'
      },
      hourly: {
        time: ['2025-06-18T00:00', '2025-06-18T01:00'],
        temperature_2m: [28, 29],
        relativehumidity_2m: [80, 82],
        direct_radiation: [100, 200]
      },
      daily_units: {
        time: 'iso8601',
        temperature_2m_max: '°C',
        temperature_2m_min: '°C'
      },
      daily: {
        time: ['2025-06-18'],
        temperature_2m_max: [31],
        temperature_2m_min: [25]
      }
    };

    service.getWeatherForecastData(1.3691, 103.8454, '2025-06-18', '2025-06-20')
      .subscribe(data => {
        expect(data).toEqual(mockForecast);
      });

    const req = httpMock.expectOne((request) =>
      request.url.startsWith('https://api.open-meteo.com/v1/forecast')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockForecast);
  });
});
