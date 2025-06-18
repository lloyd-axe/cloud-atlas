import { Component, Input, ElementRef, HostListener } from '@angular/core';
import * as L from 'leaflet';
import { MapTileLayerService } from '../../services/map-tile-layer.service';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'app-layer-settings-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layer-settings-button.component.html',
  styleUrl: './layer-settings-button.component.scss'
})
export class LayerSettingsButtonComponent {
  @Input() map: L.Map | null = null;
  showMenu = signal(false);

  constructor(
    private tileLayerService: MapTileLayerService,
    private elementRef: ElementRef
  ) {}

  toggleMenu() {
    this.showMenu.update(v => !v);
  }

  setBaseLayer(name: string) {
    if (!this.map) return;

    const baseLayers: Record<string, L.TileLayer> = {
      'Satellite': this.tileLayerService.esriMap,
      'Street': this.tileLayerService.streetMap,
      'Topographical': this.tileLayerService.topoMap
    };

    Object.values(baseLayers).forEach(layer => {
      if (this.map!.hasLayer(layer)) {
        this.map!.removeLayer(layer);
      }
    });

    const selectedLayer = baseLayers[name];
    selectedLayer.addTo(this.map);
    this.tileLayerService.currentLayer.set(selectedLayer);

    if (name === 'Satellite') {
      if (!this.map.hasLayer(this.tileLayerService.labels)) {
        this.tileLayerService.labels.addTo(this.map);
      }
    } else {
      if (this.map.hasLayer(this.tileLayerService.labels)) {
        this.map.removeLayer(this.tileLayerService.labels);
      }
    }

    this.showMenu.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showMenu.set(false);
    }
  }
}
