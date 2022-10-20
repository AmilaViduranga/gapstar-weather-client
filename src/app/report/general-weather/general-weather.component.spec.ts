import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralWeatherComponent } from './general-weather.component';

describe('GeneralWeatherComponent', () => {
  let component: GeneralWeatherComponent;
  let fixture: ComponentFixture<GeneralWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
