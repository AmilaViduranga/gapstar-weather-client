import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: number): string {
    const givenDateInMiliseconds = value * 1000;
    const localDate = new Date(givenDateInMiliseconds);
    if (localDate && givenDateInMiliseconds > 0) {
      let date = localDate.getDate();
      let month = localDate.getMonth() + 1;
      const year = localDate.getFullYear();
      if (date < 10) {
        date = `0${date}` as any;
      }
      if (month < 10) {
        month = `0${month}` as any;
      }
      return `${year}-${month}-${date}`;
    } else {
      return "";
    }
  }
}
