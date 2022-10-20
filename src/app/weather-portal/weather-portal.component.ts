import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import type { LocationDetails } from '../DAO/location.dao';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-weather-portal',
  templateUrl: './weather-portal.component.html',
  styleUrls: ['./weather-portal.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  locationDetails: LocationDetails; 

  constructor(private httpService: RestService) { }

  ngOnInit(): void {
    this.getWetherDetails();
  }

  getWetherDetails(): void {
    if (this.locationDetails?.latitude && this.locationDetails?.logitude) {
      this.httpService.get(`${this.httpService.generateBasicWeatherDetailUrl()}?lat=${this.locationDetails.latitude}&lon=${this.locationDetails.logitude}&appid=${environment.openWeatherApiKey}&units=metric`, false).subscribe(res => {
        
      });
    }
  }

  onLocationSelected(locationDetails: LocationDetails): void {
    this.locationDetails = locationDetails;
    this.getWetherDetails();
  }

}
