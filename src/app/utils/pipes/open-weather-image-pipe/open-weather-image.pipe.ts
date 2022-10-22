/**
 * Used to generate image url for provided icon
 */
import { Pipe, PipeTransform } from '@angular/core';
import { RestService } from '../../../rest.service';

@Pipe({
  name: 'openWeatherImage'
})
export class OpenWeatherImagePipe implements PipeTransform {
  /**
   * constructor
   * @param httpService RestService injectable instance
   */
  constructor(private httpService: RestService) {

  }

  /**
   * Transform method that used in pipe. It gives image url
   * @param image image string eg:- 1a
   * @param size size of the image eg:- 2x
   * @returns image url
   */
  transform(image: string, size: string): string {
    return this.httpService.generateImageBaseUrl(image, size);
  }
}
