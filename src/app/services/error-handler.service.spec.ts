import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit error message', (done) => {
    const testMessage = 'Test error message';
    
    service.error$.subscribe(error => {
      expect(error.message).toBe(testMessage);
      expect(error.type).toBe('error');
      expect(error.duration).toBe(5000);
      done();
    });

    service.showError(testMessage);
  });

  it('should emit warning message with custom duration', (done) => {
    const testMessage = 'Test warning message';
    const customDuration = 3000;
    
    service.error$.subscribe(error => {
      expect(error.message).toBe(testMessage);
      expect(error.type).toBe('warning');
      expect(error.duration).toBe(customDuration);
      done();
    });

    service.showError(testMessage, 'warning', customDuration);
  });
});
