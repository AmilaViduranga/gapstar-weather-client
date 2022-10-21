import { Pipe, PipeTransform } from '@angular/core';
import { RestService } from '../../../rest.service';

@Pipe({
  name: 'openWeatherImage'
})
export class OpenWeatherImagePipe implements PipeTransform {

  constructor(private httpService: RestService) {

  }

  transform(image: string, size: string): string {
    return this.httpService.generateImageBaseUrl(image, size);
  }
}
