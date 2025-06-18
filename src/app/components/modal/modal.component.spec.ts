import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { provideHttpClient } from '@angular/common/http';
import { SgWeatherService } from '../../services/sg-weather.service';
import { ModalStateService } from '../../services/modal-state.service';
import { ChartRenderService } from '../../services/chart-render.service';
import { WeatherUtilService } from '../../services/weather-util.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { of } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let weatherService: jasmine.SpyObj<SgWeatherService>;
  let modalStateService: ModalStateService;

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('SgWeatherService', ['getWeatherForecastData']);
    weatherServiceSpy.getWeatherForecastData.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [ModalComponent],
      providers: [
        provideHttpClient(),
        { provide: SgWeatherService, useValue: weatherServiceSpy },
        ModalStateService,
        ChartRenderService,
        WeatherUtilService,
        ErrorHandlerService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(SgWeatherService) as jasmine.SpyObj<SgWeatherService>;
    modalStateService = TestBed.inject(ModalStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
