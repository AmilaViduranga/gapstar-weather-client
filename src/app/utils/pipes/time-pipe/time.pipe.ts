/**
 * Used to generate seconds to user readable time
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  /**
   * Transform method that used inside pipe
   * @param value date valuse in seconds
   * @returns user readable time in hh:mm
   */
  transform(value: number): string {
    const givenDateInMiliseconds = value * 1000;
    const localDate = new Date(givenDateInMiliseconds);
    if (localDate && givenDateInMiliseconds > 0) {
      let hours = localDate.getHours();
      let minites = localDate.getMinutes();
      if (hours < 10) {
        hours = `0${hours}` as any;
      }
      if (minites < 10) {
        minites = `0${minites}` as any;
      }
      return `${hours}:${minites}`;
    } else {
      return "";
    }
  }
}
