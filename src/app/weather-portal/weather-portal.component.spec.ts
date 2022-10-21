import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AlertService } from 'ngx-alerts';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasicResponse } from '../dao/mocks/basic-weather.mock';
import type { GeneralReport } from '../dao/report/general.dao';
import type { LocationReport } from '../dao/report/location.dao';
import type { SunRiseSetReport } from '../dao/report/sun-rise-set.dao';
import { RestService } from '../rest.service';
import { WeatherPortalComponent } from './weather-portal.component';

describe('WetherPortalComponent', () => {
  let component: WeatherPortalComponent;
  let fixture: ComponentFixture<WeatherPortalComponent>;
  let restService: RestService;
  let spiner: NgxSpinnerService;
  let historyComponent: jasmine.Spy;
  const mockWetherBasicResponse = BasicResponse;

  class TestAlertService { 
    danger(value:string) {
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherPortalComponent ],
      providers: [ RestService, HttpClient, HttpHandler, { provide: AlertService, useClass: TestAlertService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherPortalComponent);
    component = fixture.componentInstance;
    restService = TestBed.inject(RestService);
    spiner = TestBed.inject(NgxSpinnerService);
    historyComponent = jasmine.createSpyObj("historyComponent", ["loadDetailReport"]);
    spyOn(spiner, "show");
    spyOn(spiner, "hide");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit()", () => {
    beforeEach(() => {
      component.locationDetails = {
        latitude: 7.028,
        logitude: 79.923,
      };
      component.historyComponent = historyComponent as any;
      spyOn(restService, "get").and.returnValue(of(mockWetherBasicResponse));
    })

    it ("should execute get method using given location details", () => {
      // given
      const url = `${restService.generateBasicWeatherDetailUrl()}?lat=${component.locationDetails.latitude}&lon=${component.locationDetails.logitude}&appid=${environment.openWeatherApiKey}&units=metric`;
      component.historyComponent = historyComponent as any;

      // when
      component.ngOnInit();

      // then
      expect(restService.get).toHaveBeenCalledWith(url, false);
    });

    it ("should create location report from fetched data which comes from openWeatherAPI", fakeAsync(() => {
      // given
      const expectedInstance: LocationReport = {
        cityName: "Welisara",
        latitude: 7.028,
        longitude: 79.923,
        time: mockWetherBasicResponse.dt,
      }

      // when
      component.ngOnInit();
      fixture.detectChanges();
      tick();

      // then
      expect(component.locationReport).toEqual(jasmine.objectContaining(expectedInstance));
    }));

    it ("should create general report from fetched data which comes from openWeatherAPI", fakeAsync(() => {
      // given
      const expectedInstance: GeneralReport = {
        averageTemp: 24.45,
        maxTemp: 24.45,
        minimumTemp: 24.45,
        image: {
          icon: "10n",
          description: "moderate rain"
        },
        pressure: 1012,
        humidity: 90,
        rain: 2.11
      }

      // when
      component.ngOnInit();
      fixture.detectChanges();
      tick();

      // then
      expect(component.generalWeatherReport).toEqual(jasmine.objectContaining(expectedInstance));
    }));

    it ("should create general report from fetched data which comes from openWeatherAPI", fakeAsync(() => {
      // given
      const expectedInstance: SunRiseSetReport = {
        rise: 1666312003,
        set: 1666354977,
      }

      // when
      component.ngOnInit();
      fixture.detectChanges();
      tick();

      // then
      expect(component.sunRiseSetReport).toEqual(jasmine.objectContaining(expectedInstance));
    }));
  });
  

  describe("onLocationSelected()", () => {

    beforeEach(() => {
      component.historyComponent = historyComponent as any;
      spyOn(restService, "get").and.returnValue(of(mockWetherBasicResponse));
    })

    it ("should execute the get method for given location details called from `onLocationSelected`", () => {
      // given
      const locationDetails = {
        latitude: 7.028,
        logitude: 79.923,
      };
      const url = `${restService.generateBasicWeatherDetailUrl()}?lat=${locationDetails.latitude}&lon=${locationDetails.logitude}&appid=${environment.openWeatherApiKey}&units=metric`;
      component.historyComponent = historyComponent as any;

      // when
      component.onLocationSelected(locationDetails);

      // then
      expect(component.locationDetails).toEqual(jasmine.objectContaining(locationDetails));
      expect(restService.get).toHaveBeenCalledWith(url, false);
    });
  });
});
