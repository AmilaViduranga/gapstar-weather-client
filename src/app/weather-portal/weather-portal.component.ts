/**
 * Component that used to display weather details to the user. It has geo map and weather details
 */
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { HistoryComponent } from '../report/history/history.component';

@Component({
  selector: 'app-weather-portal',
  templateUrl: './weather-portal.component.html',
  styleUrls: ['./weather-portal.component.css']
})
export class WeatherPortalComponent implements OnInit {

  @ViewChild(HistoryComponent) historyComponent: HistoryComponent;
  locationDetails: LocationDetails;

  // reports
  locationReport: LocationReport;
  generalWeatherReport: GeneralReport;
  sunRiseSetReport: SunRiseSetReport;
  windReport: WindReport;

  /**
   * constructor
   * @param httpService RestService injected 
   * @param zone ngZone to run zone. It will increase the perfirmance by running the statement in another thread
   * @param spiner the preloader injected instance
   * @param alertService the alert service injected instance
   */
  constructor(private httpService: RestService, private zone: NgZone, private spiner: NgxSpinnerService, private alertService: AlertService) { }

  /**
   * ngOnInit angular life cycle method
   */
  ngOnInit(): void {
    this.getWetherDetails();
  }

  /**
   * Used to generate weather details by fetching details from openWeatherAPI
   */
  private getWetherDetails(): void {
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
    
              // location report
              this.locationReport = {
                cityName: weatherReport.name,
                latitude: weatherReport.coord.lat,
                longitude: weatherReport.coord.lon,
                time: weatherReport.dt,
              }
    
              // general weather report
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
    
              // sun rise report
              this.sunRiseSetReport = {
                rise: weatherReport?.sys?.sunrise,
                set: weatherReport?.sys?.sunset,
              }
    
              // wind report
              this.windReport = {
                speed: weatherReport?.wind?.speed,
              }

              if (this.historyComponent) {
                this.historyComponent.loadDetailReport();
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

  /**
   * Emit method once user select a location
   * @param locationDetails Latitude and longitude of selected location
   */
  onLocationSelected(locationDetails: LocationDetails): void {
    this.locationDetails = locationDetails;
    this.getWetherDetails();
  }
}
