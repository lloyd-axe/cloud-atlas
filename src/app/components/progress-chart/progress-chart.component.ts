import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressChartService } from '../../services/progress-chart.service';

@Component({
  standalone: true,
  selector: 'app-progress-chart',
  imports: [CommonModule],
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss']
})
export class ProgressChartComponent implements OnChanges {
  @Input() percentage: number = 0;

  constructor(public chartService: ProgressChartService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['percentage']) {
      this.chartService.animateProgress(changes['percentage'].currentValue);
    }
  }
}
