import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProgressChartService {
  animatedValue = signal(0);

  animateProgress(targetValue: number, duration: number = 500) {
    const startValue = this.animatedValue();
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newValue = startValue + (targetValue - startValue) * progress;
      this.animatedValue.set(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  reset() {
    this.animatedValue.set(0);
  }
}
