import { Injectable, signal } from '@angular/core';
import * as L from 'leaflet';

@Injectable({ providedIn: 'root' })
export class MapTileLayerService {
  readonly MAX_ZOOM = 18;
  readonly MIN_ZOOM = 10;

  readonly esriMap = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: this.MAX_ZOOM, minZoom: this.MIN_ZOOM, attribution: '© Esri' }
  );

  readonly streetMap = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { maxZoom: this.MAX_ZOOM, minZoom: this.MIN_ZOOM, attribution: '© OpenStreetMap' }
  );

  readonly topoMap = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    { maxZoom: this.MAX_ZOOM, minZoom: this.MIN_ZOOM, attribution: '© OpenTopoMap' }
  );

  readonly labels = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png',
    { attribution: 'CartoDB' }
  );

  currentLayer = signal<L.TileLayer>(this.esriMap);
}
