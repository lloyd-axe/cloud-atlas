import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges, signal } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.scss'
})
export class MiniMapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() latitude!: number;
  @Input() longitude!: number;

  coords = signal({ lat: 0, lng: 0 });

  private map!: L.Map;
  private coordControl!: L.Control;

  ngAfterViewInit(): void {
    this.coords.set({ lat: this.latitude, lng: this.longitude });

    this.map = L.map('mini-map', {
      center: [this.coords().lat, this.coords().lng],
      zoom: 12,
      dragging: false,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
      doubleClickZoom: false,
      keyboard: false
    });

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    ).addTo(this.map);

    this.addCoordControl();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && (changes['latitude'] || changes['longitude'])) {
      this.coords.set({ lat: this.latitude, lng: this.longitude });
      this.map.setView([this.coords().lat, this.coords().lng], 13);
      this.updateCoordControl();
    }
  }

  private addCoordControl(): void {
    const CoordControl = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', 'mini-map-coords');
        div.innerHTML = `<strong>Location</strong><br>${this.coords().lat} N  ${this.coords().lng} E`;
        return div;
      }
    });
    this.coordControl = new CoordControl({ position: 'bottomright' });
    this.coordControl.addTo(this.map);
  }

  private updateCoordControl(): void {
    const container = this.coordControl?.getContainer();
    if (container) {
      container.innerHTML = `<strong>Location</strong><br>${this.coords().lat} N  ${this.coords().lng} E`;
    }
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
