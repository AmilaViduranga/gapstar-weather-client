/** 
 * This is service class. It used to call third party backend services
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  /**
   * constructor
   * @param http: httpClent service (injectable)
   */
  constructor(private http: HttpClient) { }

  /**
   * Use to call GET methods.
   * @param path rl os rest resource
   * @param isAuthorizedRequest is auth request or not (For this project we are not using this becase we use api key for every request)
   * @returns Any type Observable because it is common for entire app
   */
  get(path: any, isAuthorizedRequest: boolean): Observable<any> {
    try {
      return this.http.get(path);
    } catch (err) {
      return err;
    }
  }

  /**
   * Used to generate the image url
   * @param image image path eg: 1a
   * @param size size of the image eg: 2x
   * @returns generated url of image
   */
  generateImageBaseUrl(image: string, size: string): string {
    return `${environment.openWeatherAPI.resourceBaseUrl}${environment.openWeatherAPI.image}/${image}@${size}.png`;
  }

  /**
   * Used to hit 2.5 OpenWeatherAPI to get basic weather details
   * @returns generated url of rest resource
   */
  generateBasicWeatherDetailUrl(): string {
    return `${environment.openWeatherAPI.baseUrl}${environment.openWeatherAPI.data}${environment.openWeatherAPI.v2}${environment.openWeatherAPI.basic}`;
  }
  
  /**
   * Used to hit 3.0 OpenweatherAPI to get weather details
   * @returns generated url for rest resource
   */
  generateInDetailWeatherDetailUrl(): string {
    return `${environment.openWeatherAPI.baseUrl}${environment.openWeatherAPI.data}${environment.openWeatherAPI.v3}${environment.openWeatherAPI.detail}`;
  }
}