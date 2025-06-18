import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ErrorToastComponent } from './error-toast.component';
import { ErrorHandlerService } from '../../services/error-handler.service';

describe('ErrorToastComponent', () => {
  let component: ErrorToastComponent;
  let fixture: ComponentFixture<ErrorToastComponent>;
  let errorHandlerService: ErrorHandlerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorToastComponent],
      providers: [ErrorHandlerService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorToastComponent);
    component = fixture.componentInstance;
    errorHandlerService = TestBed.inject(ErrorHandlerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error message', fakeAsync(() => {
    const testMessage = 'Test error message';
    errorHandlerService.showError(testMessage);
    fixture.detectChanges();

    expect(component.showToast).toBeTruthy();
    expect(component.currentError?.message).toBe(testMessage);
    expect(component.currentError?.type).toBe('error');

    tick(5000);
    expect(component.showToast).toBeFalsy();
    expect(component.currentError).toBeNull();
  }));

  it('should show warning message with custom duration', fakeAsync(() => {
    const testMessage = 'Test warning message';
    const customDuration = 3000;
    errorHandlerService.showError(testMessage, 'warning', customDuration);
    fixture.detectChanges();

    expect(component.showToast).toBeTruthy();
    expect(component.currentError?.message).toBe(testMessage);
    expect(component.currentError?.type).toBe('warning');

    tick(customDuration);
    expect(component.showToast).toBeFalsy();
    expect(component.currentError).toBeNull();
  }));
});
