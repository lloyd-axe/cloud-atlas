import { Component } from '@angular/core';
import { MapComponent } from '../components/map/map.component';
import { ModalStateService } from '../services/modal-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public modalState: ModalStateService) {}
}
