import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { LocationData, WeatherForecastData } from '../models/data.types';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({ providedIn: 'root' })
export class SgWeatherService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.status === 0) {
      errorMessage = 'Network error occurred. Please check your connection.';
    } else if (error.status === 404) {
      errorMessage = 'Weather data not found.';
    } else if (error.status === 429) {
      errorMessage = 'Too many requests. Please try again later.';
    } else if (error.status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }

    this.errorHandler.showError(errorMessage);
    return throwError(() => error);
  }

  getLocationData(): Observable<any> {
    const url = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
    return this.http.get<LocationData>(url).pipe(
      retry(2),
      catchError(error => this.handleError(error))
    );
  }

  getWeatherForecastData(lat: number, lon: number, startDate: string, endDate: string): Observable<WeatherForecastData> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=relativehumidity_2m,direct_radiation,temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore&start_date=${startDate}&end_date=${endDate}`;
    return this.http.get<WeatherForecastData>(url).pipe(
      retry(2),
      catchError(error => this.handleError(error))
    );
  }
}
