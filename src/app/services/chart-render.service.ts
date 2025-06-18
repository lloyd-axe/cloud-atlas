import { Injectable } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Injectable({ providedIn: 'root' })
export class ChartRenderService {

  renderLineChart(canvasId: string, labels: string[], datasets: any[], yLabel: string): Chart | null {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return null;

    const isMobile = window.innerWidth <= 768;

    return new Chart(canvas, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#fff',
              font: { size: isMobile ? 8 : 12 },
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              callback: (value, index) => {
                if (index === 0 || index === labels.length - 1) return labels[index];
                return '';
              }
            }
          },
          y: {
            grid: { display: false },
            title: { display: true, text: yLabel, color: '#fff' },
            ticks: {
              color: '#fff',
              font: { size: isMobile ? 8 : 12 }
            }
          }
        }
      }
    });
  }
}
