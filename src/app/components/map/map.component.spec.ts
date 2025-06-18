import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { SgWeatherService } from '../../services/sg-weather.service';
import { ModalStateService } from '../../services/modal-state.service';
import { MapService } from '../../services/map.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-modal',
  template: '',
  standalone: true
})
class MockModalComponent {}

@Component({
  selector: 'app-search-bar',
  template: '',
  standalone: true
})
class MockSearchBarComponent {}

@Component({
  selector: 'app-layer-settings-button',
  template: '',
  standalone: true
})
class MockLayerSettingsButtonComponent {}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let weatherService: jasmine.SpyObj<SgWeatherService>;
  let mapService: jasmine.SpyObj<MapService>;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('SgWeatherService', ['getLocationData']);
    const mapServiceSpy = jasmine.createSpyObj('MapService', ['initializeMap']);
    
    await TestBed.configureTestingModule({
      imports: [
        MapComponent,
        MockModalComponent,
        MockSearchBarComponent,
        MockLayerSettingsButtonComponent
      ],
      providers: [
        provideHttpClient(),
        { provide: SgWeatherService, useValue: weatherServiceSpy },
        { provide: MapService, useValue: mapServiceSpy },
        ModalStateService,
        ErrorHandlerService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(SgWeatherService) as jasmine.SpyObj<SgWeatherService>;
    mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
