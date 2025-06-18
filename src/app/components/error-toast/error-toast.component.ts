import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService, ErrorMessage } from '../../services/error-handler.service';

@Component({
  selector: 'app-error-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.scss'
})
export class ErrorToastComponent implements OnInit {
  showToast = false;
  currentError: ErrorMessage | null = null;

  constructor(private errorHandler: ErrorHandlerService) {}

  ngOnInit() {
    this.errorHandler.error$.subscribe(error => {
      this.currentError = error;
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
        this.currentError = null;
      }, error.duration || 5000);
    });
  }
}