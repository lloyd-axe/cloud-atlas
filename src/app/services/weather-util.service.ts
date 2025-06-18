import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WeatherUtilService {

  average(arr: number[]): number {
    if (!arr || arr.length === 0) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return +(sum / arr.length).toFixed(2);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getPastDate(daysAgo: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
  }

  calculateHeatIndex(temperature: number, humidity: number): number {
    if (temperature < 27) return temperature;
    const T = temperature;
    const R = humidity;
    const HI = -8.784695 + 1.61139411 * T + 2.338549 * R
      - 0.14611605 * T * R - 0.012308094 * T * T - 0.016424828 * R * R
      + 0.002211732 * T * T * R + 0.00072546 * T * R * R
      - 0.000003582 * T * T * R * R;
    return +HI.toFixed(1);
  }
}
