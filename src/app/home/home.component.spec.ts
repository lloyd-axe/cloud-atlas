import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { Component } from '@angular/core';
import { MapComponent } from '../components/map/map.component';

@Component({
  selector: 'app-map',
  template: '',
  standalone: true
})
class MockMapComponent {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule
      ],
    })
    .overrideComponent(HomeComponent, {
      remove: { imports: [MapComponent] },
      add: { imports: [MockMapComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
