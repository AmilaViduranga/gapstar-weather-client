import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RestService } from './rest.service';

describe('RestApiservice', () => {
    let service: RestService;
    let httpClient: HttpClient;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ]
        }).compileComponents();
        service = TestBed.inject(RestService);
        httpClient = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it ("should execute api when cosumer hit get method", () => {
        // given
        spyOn(httpClient, "get").and.returnValue(of());

        // when
        const path = "http://test.com";
        service.get(path, false);

        // then
        expect(httpClient.get).toHaveBeenCalledWith(path)
    });

    it("should return valid url for given image path and size", () => {
        // given
        const image = "1a";
        const size = "2x";
        const expectedUrl = `${environment.openWeatherAPI.resourceBaseUrl}${environment.openWeatherAPI.image}/${image}@${size}.png`;
    
        // when
        const acturalUrl = service.generateImageBaseUrl(image, size);
    
        // then
        expect(expectedUrl).toEqual(acturalUrl);
    });

    it("should return basic weather detail url", () => {
        // given
        const path = `${environment.openWeatherAPI.baseUrl}${environment.openWeatherAPI.data}${environment.openWeatherAPI.v2}${environment.openWeatherAPI.basic}`;

        // when
        const actualUrl = service.generateBasicWeatherDetailUrl();

        // then
        expect(path).toEqual(actualUrl);
    });

    it("should return detail weather url", () => {
        // given
        const path = `${environment.openWeatherAPI.baseUrl}${environment.openWeatherAPI.data}${environment.openWeatherAPI.v3}${environment.openWeatherAPI.detail}`;

        // when
        const actualUrl = service.generateInDetailWeatherDetailUrl();

        // then
        expect(path).toEqual(actualUrl);
    });
});