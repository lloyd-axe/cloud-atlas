import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ErrorToastComponent } from './components/error-toast/error-toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, ErrorToastComponent],
  template: `
    <app-home/>
    <app-error-toast/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'cloudatlas-sg';
}
