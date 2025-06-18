import { AfterViewInit, Component, signal, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalStateService } from '../../services/modal-state.service';
import { MapService } from '../../services/map.service';
import { SgWeatherService } from '../../services/sg-weather.service';
import { LocationData } from '../../models/data.types';
import { ModalComponent } from '../modal/modal.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { LayerSettingsButtonComponent } from '../layer-settings-button/layer-settings-button.component';
import { ErrorToastComponent } from '../error-toast/error-toast.component';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as L from 'leaflet';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    ModalComponent, 
    SearchBarComponent, 
    LayerSettingsButtonComponent, 
    ErrorToastComponent,
    CommonModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  [x: string]: any;
  public mapInstance: L.Map | null = null;  // <--- ✅ keep this as regular property
  public locations = signal<LocationData[]>([]);

  private destroyRef = inject(DestroyRef);

  constructor(
    private weatherService: SgWeatherService,
    public modalState: ModalStateService,
    private mapService: MapService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mapInstance = this.mapService.initializeMap('map');
      this.loadLocations();
    });
  }

  private loadLocations(): void {
    this.weatherService.getLocationData()
      .pipe(
        catchError(error => {
          this.errorHandler.showError('Failed to load weather stations. Please try again later.');
          return EMPTY;
        })
      )
      .subscribe(data => {
        try {
          const forecasts = data.items[0].forecasts;
          const areaMetadata = data.area_metadata;

          if (!forecasts || !areaMetadata) {
            throw new Error('Invalid data format');
          }

          const locs: LocationData[] = forecasts
            .map((forecast: any): LocationData | null => {
              const areaInfo = areaMetadata.find((a: any) => a.name === forecast.area);
              return areaInfo
                ? {
                    name: forecast.area,
                    latitude: areaInfo.label_location.latitude,
                    longitude: areaInfo.label_location.longitude,
                    weather: forecast.forecast
                  }
                : null;
            })
            .filter((loc: LocationData | null): loc is LocationData => loc !== null);

          this.locations.set(locs);
          if (this.mapInstance) {
            this.mapService.addMarkers(this.mapInstance, locs);
          }
        } catch (error) {
          this.errorHandler.showError('Error processing weather data.');
        }
      });
  }

  onLocationSelected(loc: LocationData): void {
    if (this.mapInstance) {
      this.mapService.flyToLocation(this.mapInstance, loc);
    }
  }
}
