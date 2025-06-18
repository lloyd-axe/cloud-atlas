import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniMapComponent } from './mini-map.component';
import { MapService } from '../../services/map.service';

describe('MiniMapComponent', () => {
  let component: MiniMapComponent;
  let fixture: ComponentFixture<MiniMapComponent>;
  let mapService: jasmine.SpyObj<MapService>;

  beforeEach(async () => {
    const mapServiceSpy = jasmine.createSpyObj('MapService', ['initializeMiniMap']);

    await TestBed.configureTestingModule({
      imports: [MiniMapComponent],
      providers: [
        { provide: MapService, useValue: mapServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniMapComponent);
    component = fixture.componentInstance;
    mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
    
    component.latitude = 1.3521;  // Singapore latitude
    component.longitude = 103.8198;  // Singapore longitude
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
