import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: number): string {
    const givenDateInMiliseconds = value * 1000;
    const localDate = new Date(givenDateInMiliseconds);
    const date = localDate.getDate();
    const month = localDate.getMonth() + 1;
    const year = localDate.getFullYear();
    return `${year}/${month}/${date}`;
  }

}
