import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ErrorToastComponent } from './components/error-toast/error-toast.component';

// Create mock components
@Component({
  selector: 'app-home',
  template: '',
  standalone: true  // Add standalone flag
})
class MockHomeComponent {}

@Component({
  selector: 'app-error-toast',
  template: '',
  standalone: true  // Add standalone flag
})
class MockErrorToastComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      declarations: [], // No need for declarations with standalone components
      providers: []
    })
    .overrideComponent(AppComponent, {
      remove: { imports: [HomeComponent, ErrorToastComponent] },
      add: { imports: [MockHomeComponent, MockErrorToastComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render home component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-home')).toBeTruthy();
  });

  it('should render error toast component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-error-toast')).toBeTruthy();
  });
});
