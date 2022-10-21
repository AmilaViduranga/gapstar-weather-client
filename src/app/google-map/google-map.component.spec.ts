import { MapsAPILoader } from '@agm/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { LocationDetails } from '../dao/geo/location.dao';

import { GoogleMapComponent } from './google-map.component';

describe('GoogleMapComponent', () => {
  let component: GoogleMapComponent;
  let fixture: ComponentFixture<GoogleMapComponent>;
  const loaderMapAiiServiceStub = {
    load: () => Promise.resolve()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GooglePlaceModule ],
      declarations: [ GoogleMapComponent ],
      providers: [{ provide: MapsAPILoader, useValue: loaderMapAiiServiceStub } ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(GoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    xit("should get the current location", () => {
      // given
      const currentLocation = {
        coords: {
          latitude: 3.45,
          longitude: 78.23,
        }
      };
      spyOn(navigator.geolocation,"getCurrentPosition").and.callFake((...args: any[]) => {
        const position = currentLocation;
        args[0](position);
      });

      // when
      component.ngOnInit();

      // then
      expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled()
    })
  });

  describe("handleAddressChange()", () => {
    let address: Address;
    const latitude = 3.45;
    const longitude = 21.23;

    beforeEach(() => {
      address = {
        geometry: {
          location: {
            lat: jasmine.createSpy("lat").and.callFake(() => {
              return latitude
            }),
            lng: jasmine.createSpy("lng").and.callFake(() => {
              return longitude;
            }),
          }
        }
      } as any;
    })

    it ("should emit selected geo location latitude and logitude", () => {
      // given
      spyOn(component.getLocation, "emit");
      const locationDetails: LocationDetails = {
        latitude: latitude,
        logitude: longitude,
      }

      // when
      component.handleAddressChange(address);

      // then
      expect(component.mapLocation.latitude).toEqual(latitude);
      expect(component.mapLocation.logitude).toEqual(longitude);
      expect(component.getLocation.emit).toHaveBeenCalledWith(locationDetails);
    });
  });
  
});

