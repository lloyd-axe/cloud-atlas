import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalStateService {
  isOpen = signal(false);
  locationName = signal<string | null>(null);
  latitude = signal<number | null>(null);
  longitude = signal<number | null>(null);
  currentWeather = signal<string | null>(null);

  open(name: string, lat: number, lon: number, weather: string) {
    this.locationName.set(name);
    this.latitude.set(lat);
    this.longitude.set(lon);
    this.currentWeather.set(weather);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
    this.locationName.set(null);
    this.latitude.set(null);
    this.longitude.set(null);
    this.currentWeather.set(null);
  }
}
