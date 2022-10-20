import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  get(path: any, isAuthorizedRequest: boolean): Observable<any> {
    try {
      return this.http.get(path);
    } catch (err) {
      return err;
    }
  }

  generateImageBaseUrl(image: string, size: string): string {
    return `${environment.openWeatherAPI.resourceBaseUrl}${environment.openWeatherAPI.image}/${image}@${size}.png`;
  }

  generateBasicWeatherDetailUrl(): string {
    return `${environment.openWeatherAPI.baseUrl}${environment.openWeatherAPI.data}${environment.openWeatherAPI.v2}${environment.openWeatherAPI.basic}`;
  }

  generateInDetailWeatherDetailUrl(): string {
    return `${environment.openWeatherAPI.baseUrl}${environment.openWeatherAPI.data}${environment.openWeatherAPI.v3}${environment.openWeatherAPI.detail}`;
  }
}