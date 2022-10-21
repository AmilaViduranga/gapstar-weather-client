import { Component, NgZone, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'ngx-alerts';
import { environment } from 'src/environments/environment';
import type { LocationDetails } from '../dao/geo/location.dao';
import type { GeneralReport } from '../dao/report/general.dao';
import type { LocationReport } from '../dao/report/location.dao';
import type { SunRiseSetReport } from '../dao/report/sun-rise-set.dao';
import type { WindReport } from '../dao/report/wind.dao';
import type { WeatherReport } from '../dao/responses/weather-basic.dao';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-weather-portal',
  templateUrl: './weather-portal.component.html',
  styleUrls: ['./weather-portal.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  locationDetails: LocationDetails;

  // reports
  locationReport: LocationReport;
  generalWeatherReport: GeneralReport;
  sunRiseSetReport: SunRiseSetReport;
  windReport: WindReport;

  constructor(private httpService: RestService, private zone: NgZone, private spiner: NgxSpinnerService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getWetherDetails();
  }

  getWetherDetails(): void {
    if (this.locationDetails?.latitude && this.locationDetails?.logitude) {
      this.spiner.show();
      this.httpService.get(`${this.httpService.generateBasicWeatherDetailUrl()}?lat=${this.locationDetails.latitude}&lon=${this.locationDetails.logitude}&appid=${environment.openWeatherApiKey}&units=metric`, false).subscribe(
        {
          next: (weatherReport: WeatherReport) => {
            this.zone.run(() => {
              if (weatherReport.rain && weatherReport.rain["1h"]) {
                weatherReport.rain.oneHour = weatherReport.rain["1h"];
              }
              if (weatherReport.snow && weatherReport.snow["1h"]) {
                weatherReport.snow.oneHour = weatherReport.snow["1h"];
              }
    
              this.locationReport = {
                cityName: weatherReport.name,
                latitude: weatherReport.coord.lat,
                longitude: weatherReport.coord.lon,
                time: weatherReport.dt,
              }
    
              this.generalWeatherReport = {
                averageTemp: weatherReport.main.temp,
                maxTemp: weatherReport.main.temp_max,
                minimumTemp: weatherReport.main.temp_min,
                image: {
                  icon: weatherReport.weather[0].icon,
                  description: weatherReport.weather[0].description,
                },
                pressure: weatherReport.main.pressure,
                humidity: weatherReport.main.humidity,
                rain: weatherReport.rain?.oneHour,
                snow: weatherReport.snow?.oneHour,
              }
    
              this.sunRiseSetReport = {
                rise: weatherReport?.sys?.sunrise,
                set: weatherReport?.sys?.sunset,
              }
    
              this.windReport = {
                speed: weatherReport?.wind?.speed,
              }
            });
        },
        error: (error) => {
          this.alertService.danger("Weather details are not loaded successfully, please try again");
        },
      }).add(() => {
        this.spiner.hide();
      });
    }
  }

  onLocationSelected(locationDetails: LocationDetails): void {
    this.locationDetails = locationDetails;
    this.getWetherDetails();
  }
}
