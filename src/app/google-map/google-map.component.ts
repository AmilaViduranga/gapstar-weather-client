import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import type { LocationDetails } from '../DAO/location.dao';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  mapLocation: LocationDetails = {
    latitude: 0.0,
    logitude: 0.0
  };
  zoom?: number;
  geoCoder: google.maps.Geocoder;
  autocomplete: google.maps.places.Autocomplete;
  @Output() getLocation: EventEmitter<LocationDetails> = new EventEmitter<LocationDetails>();

  @ViewChild('search')
  searchElementRef?: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
  
  ngOnInit() {
    this.loadGoogleMapAndGEOSearch();
  }

  private loadGoogleMapAndGEOSearch(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef?.nativeElement);
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.mapLocation.latitude = place.geometry.location.lat();
          this.mapLocation.logitude = place.geometry.location.lng();
          this.zoom = 12;
          this.getLocation.emit(this.mapLocation);
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapLocation.latitude = position.coords.latitude;
        this.mapLocation.logitude = position.coords.longitude;
        this.zoom = 8;
        this.getLocation.emit(this.mapLocation);
      });
    }
  }
}
