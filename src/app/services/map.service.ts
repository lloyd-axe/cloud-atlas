import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { MapTileLayerService } from './map-tile-layer.service';
import { MapIconService } from './map-icon.service';
import { ModalStateService } from './modal-state.service';
import { LocationData } from '../models/data.types';

@Injectable({ providedIn: 'root' })
export class MapService {
  private markers = new Map<string, L.Marker>();
  private currentTooltipMarker: L.Marker | null = null;

  readonly CENTER: L.LatLngExpression = [1.3521, 103.8198];
  readonly INITIAL_ZOOM = 11;
  readonly MIN_ZOOM = 10;
  readonly MAX_ZOOM = 18;
  readonly MAX_BOUNDS = L.latLngBounds(
    L.latLng(1.150 - 0.405, 103.550 - 0.405),
    L.latLng(1.500 + 0.405, 104.150 + 0.405)
  );

  constructor(
    private tileLayerService: MapTileLayerService,
    private iconService: MapIconService,
    private modalState: ModalStateService
  ) {}

  initializeMap(containerId: string): L.Map {
    const map = L.map(containerId, {
      center: this.CENTER,
      zoom: this.INITIAL_ZOOM,
      minZoom: this.MIN_ZOOM,
      maxZoom: this.MAX_ZOOM,
      maxBounds: this.MAX_BOUNDS,
      layers: [this.tileLayerService.esriMap, this.tileLayerService.labels],
      zoomControl: false
    });

    this.addZoomControl(map);
    this.setupLayerControl(map);

    return map;
  }

  private addZoomControl(map: L.Map) {
    L.control.zoom({ position: 'bottomleft' }).addTo(map);
  }

  private setupLayerControl(map: L.Map) {
    map.on('baselayerchange', (event: L.LayersControlEvent) => {
      this.tileLayerService.currentLayer.set(event.layer as L.TileLayer);

      if (event.name === 'Satellite') {
        if (!map.hasLayer(this.tileLayerService.labels)) {
          this.tileLayerService.labels.addTo(map);
        }
      } else {
        if (map.hasLayer(this.tileLayerService.labels)) {
          map.removeLayer(this.tileLayerService.labels);
        }
      }
    });
  }

  addMarkers(map: L.Map, locations: LocationData[]) {
    locations.forEach(loc => {
      const marker = L.marker([loc.latitude, loc.longitude], { icon: this.iconService.defaultIcon })
        .addTo(map)
        .bindTooltip(loc.name, { direction: 'top', offset: [0, -50], opacity: 0.9 });

      const cacheKey = `${loc.latitude},${loc.longitude}`;
      this.markers.set(cacheKey, marker);

      marker.on('click', () => {
        this.modalState.open(loc.name, loc.latitude, loc.longitude, loc.weather);
      });

      marker.on('mouseover', () => marker.setIcon(this.iconService.hoverIcon));
      marker.on('mouseout', () => marker.setIcon(this.iconService.defaultIcon));
    });
  }

  flyToLocation(map: L.Map, loc: LocationData) {
    const cacheKey = `${loc.latitude},${loc.longitude}`;
    const marker = this.markers.get(cacheKey);

    if (marker) {
      map.flyTo([loc.latitude, loc.longitude], 17, { animate: true, duration: 0.8 });

      if (this.currentTooltipMarker) {
        this.currentTooltipMarker.closeTooltip();
      }

      marker.openTooltip();
      this.currentTooltipMarker = marker;
    }
  }
}
