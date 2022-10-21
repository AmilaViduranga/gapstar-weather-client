import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const givenDateInMiliseconds = value * 1000;
    const localDate = new Date(givenDateInMiliseconds);
    const hours = localDate.getHours();
    const minites = localDate.getMinutes();
    return `${hours}:${minites}`;
  }
}
