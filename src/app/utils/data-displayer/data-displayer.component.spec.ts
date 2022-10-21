import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataMeasurementsDegree, DataType } from 'src/app/dao/util/data-displayer.dao';
import { DatePipe } from '../pipes/date-pipe/date.pipe';
import { OpenWeatherImagePipe } from '../pipes/open-weather-image-pipe/open-weather-image.pipe';
import { TimePipe } from '../pipes/time-pipe/time.pipe';
import { RestService } from 'src/app/rest.service';

import { DataDisplayerComponent } from './data-displayer.component';
import { By } from '@angular/platform-browser';

describe('DataDisplayerComponent', () => {
  let component: DataDisplayerComponent;
  let fixture: ComponentFixture<DataDisplayerComponent>;
  let httpService: RestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDisplayerComponent ],
      providers: [ RestService, HttpClient, HttpHandler ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDisplayerComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(RestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnChanges()", () => {
    it ("should return exact degree for temperature type", () => {
      // given
      component.type = DataType.TEMPERATURE;

      // when
      component.ngOnChanges("test" as any);

      // then
      expect(component.degree).toEqual(DataMeasurementsDegree.TEMPERATURE)
    });

    it ("should return exact degree for speed type", () => {
      // given
      component.type = DataType.SPEED;

      // when
      component.ngOnChanges("test" as any);

      // then
      expect(component.degree).toEqual(DataMeasurementsDegree.SPEED);
    });

    it ("should return exact degree for precentage type", () => {
      // given
      component.type = DataType.PRECENTAGE;

      // when
      component.ngOnChanges("test" as any);

      // then
      expect(component.degree).toEqual(DataMeasurementsDegree.PERCENTAGE);
    });

    it ("should return exact degree for preasure type", () => {
      // given
      component.type = DataType.PREASSURE;

      // when
      component.ngOnChanges("test" as any);

      // then
      expect(component.degree).toEqual(DataMeasurementsDegree.PREASSURE);
    });

    it ("should return exact degree for height type", () => {
      // given
      component.type = DataType.HEIGHT;

      // when
      component.ngOnChanges("test" as any);

      // then
      expect(component.degree).toEqual(DataMeasurementsDegree.HEIGHT);
    });

    it ("should return valid date for given timestamp", () => {
      // given
      const testDate = new Date().getTime() / 1000;
      component.value = testDate;
      component.type = DataType.DATE;
      const expectedDate = new DatePipe().transform(testDate);

      // when
      component.ngOnChanges("date" as any);

      // then
      expect(component.value).toEqual(expectedDate);
    });

    it ("should return valid time for given timestamp", () => {
      // given
      const testDate = new Date().getTime() / 1000;
      component.value = testDate;
      component.type = DataType.TIME;
      const expectedTime = new TimePipe().transform(testDate);

      // when
      component.ngOnChanges("time" as any);

      // then
      expect(component.value).toEqual(expectedTime);
    });

    it ("should return valid image path for given image", () => {
      // given
      const image = "1a"
      const size = "2x";
      component.value = image;
      component.size = size;
      component.type = DataType.IMAGE;
      const expectedImagePath = new OpenWeatherImagePipe(httpService).transform(image, size);

      // when
      component.ngOnChanges("image" as any);

      // then
      expect(component.value).toEqual(expectedImagePath);
    });

    it ("should display the given label value", () => {
      // given
      component.label = "test";
      const labelElement = fixture.debugElement.query(By.css(".col-form-label"));

      // when
      component.ngOnInit();
      component.ngOnChanges("label" as any);
      fixture.detectChanges();

      // then
      expect(labelElement.nativeElement.innerText).toEqual(component.label);
    });
  });
});
