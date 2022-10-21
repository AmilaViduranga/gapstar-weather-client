import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    const givenDateInMiliseconds = value * 1000;
    const localDate = new Date(givenDateInMiliseconds);
    let hours = localDate.getHours();
    let minites = localDate.getMinutes();
    if (hours < 10) {
      hours = `0${hours}` as any;
    }
    if (minites < 10) {
      minites = `0${minites}` as any;
    }
    return `${hours}:${minites}`;
  }
}
