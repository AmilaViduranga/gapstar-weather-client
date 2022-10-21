import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RestService } from 'src/app/rest.service';
import { environment } from 'src/environments/environment';
import { OpenWeatherImagePipe } from './open-weather-image.pipe';

describe('OpenWeatherImagePipe', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenWeatherImagePipe ],
      providers: [ RestService, HttpClient, HttpHandler ]
    });
  });
  
  it('create an instance', () => {
    const pipe = new OpenWeatherImagePipe(TestBed.get(RestService));
    expect(pipe).toBeTruthy();
  });

  it("should return valid url for given image path and size", () => {
    // given
    const image = "1a";
    const size = "2x";
    const expectedUrl = `${environment.openWeatherAPI.resourceBaseUrl}${environment.openWeatherAPI.image}/${image}@${size}.png`;

    // when
    const acturalUrl = new OpenWeatherImagePipe(TestBed.get(RestService)).transform(image, size);

    // then
    expect(expectedUrl).toEqual(acturalUrl);
  });
});
