import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RestService } from 'src/app/rest.service';
import type { History } from 'src/app/dao/report/history.dao';

import { HistoryComponent } from './history.component';
import { OpenWeatherImagePipe } from 'src/app/utils/pipes/open-weather-image-pipe/open-weather-image.pipe';
import { of } from 'rxjs';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let restService: RestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryComponent ],
      providers: [RestService, HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    restService = TestBed.inject(RestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ("should generate detail report by using fectched data from OpenWeatherAPI", fakeAsync(() => {
    // given
    const expectedObject: History = {
      date: "2022-10-21",
      icon: new OpenWeatherImagePipe(restService).transform("1a", "2x"),
      temperature: "56 \xB0C",
      description: "test description"
    };
    const response = {
      daily: [{
        dt: 1666368000,
        weather: [
          {
            description: "test description",
            icon: "1a",
          }
        ],
        temp: {
          day: 56
        }
      }]
    };
    component.locationDetails = {
      latitude: 7.028,
      logitude: 79.923,
    };
    spyOn(restService, "get").and.returnValue(of(response));

    // when
    component.loadDetailReport();
    tick();
    fixture.detectChanges();

    // then
    expect(component.historyDetails).toContain(jasmine.objectContaining(expectedObject));
  }));
});
