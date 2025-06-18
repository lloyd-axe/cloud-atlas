import { Component, effect, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalStateService } from '../../services/modal-state.service';
import { SgWeatherService } from '../../services/sg-weather.service';
import { ChartRenderService } from '../../services/chart-render.service';
import { WeatherUtilService } from '../../services/weather-util.service';
import { MiniMapComponent } from '../mini-map/mini-map.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ProgressChartComponent } from '../progress-chart/progress-chart.component';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MiniMapComponent, SpinnerComponent, ProgressChartComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnDestroy {
  today = new Date();
  weatherData = signal<any | null>(null);
  startDate = signal<string>('');
  endDate = signal<string>('');
  selectedRange = signal<number>(3);
  todaySummary: any = null;

  humidityChart: any = null;
  temperatureChart: any = null;
  radiationChart: any = null;

  latLngKey = computed(() => {
    const lat = this.modalState.latitude();
    const lng = this.modalState.longitude();
    return lat && lng ? `${lat},${lng}` : null;
  });

  private lastFetchedKey = signal<string | null>(null);

  constructor(
    public modalState: ModalStateService,
    private weatherService: SgWeatherService,
    private chartService: ChartRenderService,
    private util: WeatherUtilService,
    private errorHandler: ErrorHandlerService
  ) {
    this.startDate.set(this.util.formatDate(this.util.getPastDate(2)));
    this.endDate.set(this.util.formatDate(new Date()));

    effect(() => {
      const key = this.latLngKey();
      if (key && key !== this.lastFetchedKey()) {
        this.lastFetchedKey.set(key);
        this.fetchWeather();
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const data = this.weatherData();
      if (!data) return;
      this.renderCharts();
    });
  }


  ngOnDestroy() {
    this.humidityChart?.destroy();
    this.temperatureChart?.destroy();
    this.radiationChart?.destroy();
  }

  fetchWeather() {
    if (!this.modalState.latitude() || !this.modalState.longitude()) {
      this.errorHandler.showError('Location coordinates are missing.');
      return;
    }

    this.weatherService.getWeatherForecastData(
      this.modalState.latitude()!,
      this.modalState.longitude()!,
      this.startDate(),
      this.endDate()
    )
    .pipe(
      catchError(error => {
        this.errorHandler.showError('Failed to fetch weather data.');
        return EMPTY;
      })
    )
    .subscribe(data => {
      try {
        this.weatherData.set(data);
        this.computeTodaySummary(data);
      } catch (error) {
        this.errorHandler.showError('Error processing weather data.');
      }
    });
  }

  computeTodaySummary(data: any) {
    const today = this.util.formatDate(new Date());
    const dailyIndex = data.daily.time.indexOf(today);
    if (dailyIndex !== -1) {
      this.todaySummary = {
        maxTemp: data.daily.temperature_2m_max[dailyIndex],
        minTemp: data.daily.temperature_2m_min[dailyIndex],
        avgHumidity: this.util.average(data.hourly.relativehumidity_2m),
        avgRadiation: this.util.average(data.hourly.direct_radiation)
      };
    } else {
      this.todaySummary = null;
    }
  }

  updateRange(days: number) {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - (days - 1));
    this.selectedRange.set(days);
    this.startDate.set(this.util.formatDate(start));
    this.endDate.set(this.util.formatDate(today));
    this.fetchWeather();
  }

  close() {
    this.modalState.close();
  }

  get currentTemperature() {
    const data = this.weatherData();
    if (!data) return null;
    const now = new Date();
    const index = data.hourly.time.findIndex((t: string) => new Date(t) > now);
    return index > 0 ? Math.round(data.hourly.temperature_2m[index - 1]) : null;
  }

  get currentHumidity() {
    const data = this.weatherData();
    if (!data) return null;
    const now = new Date();
    const index = data.hourly.time.findIndex((t: string) => new Date(t) > now);
    return index > 0 ? data.hourly.relativehumidity_2m[index - 1] : null;
  }

  get currentHeatIndex() {
    if (this.currentTemperature != null && this.currentHumidity != null) {
      return this.util.calculateHeatIndex(this.currentTemperature, this.currentHumidity);
    }
    return this.currentTemperature;
  }

  private renderCharts() {
    const data = this.weatherData();
    if (!data) return;

    const hourlyLabels = data.hourly.time.map((t: string) => {
      const d = new Date(t);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });

    const dailyLabels = data.daily.time.map((t: string) => {
      const d = new Date(t);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });

    this.humidityChart?.destroy();
    this.humidityChart = this.chartService.renderLineChart(
      'humidityChart', hourlyLabels,
      [{ label: 'Humidity (%)', data: data.hourly.relativehumidity_2m, borderColor: 'rgb(75,192,192)', backgroundColor: 'rgba(75,192,192,0.2)', fill: true, tension: 0.3, pointRadius: 0 }],
      '%'
    );

    this.radiationChart?.destroy();
    this.radiationChart = this.chartService.renderLineChart(
      'radiationChart', hourlyLabels,
      [{ label: 'Radiation (W/m²)', data: data.hourly.direct_radiation, borderColor: 'orange', backgroundColor: 'rgba(255,165,0,0.2)', fill: true, tension: 0.3, pointRadius: 0 }],
      'W/m²'
    );

    this.temperatureChart?.destroy();
    this.temperatureChart = this.chartService.renderLineChart(
      'temperatureChart', dailyLabels,
      [
        { label: 'Max Temp (°C)', data: data.daily.temperature_2m_max, borderColor: 'rgb(255,99,132)', fill: false, tension: 0.3, pointRadius: 3 },
        { label: 'Min Temp (°C)', data: data.daily.temperature_2m_min, borderColor: 'rgb(54,162,235)', fill: false, tension: 0.3, pointRadius: 3 }
      ],
      '°C'
    );
  }
}
