import { MapsAPILoader } from '@agm/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapComponent } from './google-map.component';

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;
  const loaderMapAiiServiceStub = {
    load: () => Promise.resolve()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapComponent ],
      providers: [ {provide: MapsAPILoader, useValue: loaderMapAiiServiceStub } ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
