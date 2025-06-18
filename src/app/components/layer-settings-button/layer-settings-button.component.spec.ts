import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerSettingsButtonComponent } from './layer-settings-button.component';

describe('LayerSettingsButtonComponent', () => {
  let component: LayerSettingsButtonComponent;
  let fixture: ComponentFixture<LayerSettingsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerSettingsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerSettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
