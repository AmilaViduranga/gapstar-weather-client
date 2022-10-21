import { Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import type { History } from 'src/app/dao/report/history.dao';
import { DatePipe } from 'src/app/utils/pipes/date-pipe/date.pipe';
import { OpenWeatherImagePipe } from 'src/app/utils/pipes/open-weather-image-pipe/open-weather-image.pipe';
import { environment } from 'src/environments/environment';
import { LocationDetails } from '../../dao/geo/location.dao';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent  {

  @Input() locationDetails: LocationDetails;
  historyDetails: History[] = [];;

  constructor(private restService: RestService, private ngZone: NgZone) { }

  loadDetailReport(): void {
    this.ngZone.run(() => {
      this.restService.get(`${this.restService.generateInDetailWeatherDetailUrl()}?lat=${this.locationDetails.latitude}&lon=${this.locationDetails.logitude}&appid=${environment.openWeatherApiKey}&units=metric`, false).subscribe({
        next: (res) => {
          this.historyDetails = [];
          res.daily.forEach(dailyReport => {
            const report: History = {
              date: new DatePipe().transform(dailyReport.dt),
              description: dailyReport.weather[0].description,
              icon: new OpenWeatherImagePipe(this.restService).transform(dailyReport.weather[0].icon, "2x"),
              temperature: `${dailyReport.temp.day} \xB0C`,
            };
            this.historyDetails.push(report);
          });
          console.log(this.historyDetails);
        }
      });
    });
  }



}
