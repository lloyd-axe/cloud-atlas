import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ErrorMessage {
  message: string;
  type: 'error' | 'warning';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private errorSubject = new Subject<ErrorMessage>();
  error$ = this.errorSubject.asObservable();

  showError(message: string, type: 'error' | 'warning' = 'error', duration: number = 5000) {
    this.errorSubject.next({ message, type, duration });
  }
}