/**
 * Used to search location and mark searched location in geo map
 */

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import type { LocationDetails } from '../dao/geo/location.dao';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

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
  @Output() getLocation: EventEmitter<LocationDetails> = new EventEmitter<LocationDetails>();
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  /**
   * constructor
   * @param mapsAPILoader MapsAPILoader class injection
   */
  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) { }
  
  /**
   * ngOnInit method. Angualar life cycle method
   */
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
    });
  }

  /**
   * set the current location of the user
   */
  private setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapLocation.latitude = position.coords.latitude;
        this.mapLocation.logitude = position.coords.longitude;
        this.zoom = 8;
        this.getLocation.emit(this.mapLocation);
      });
    }
  }

  /**
   * mark lat and lon values of searched location
   * @param address Addresstype instance that keep lat and lon
   */
  handleAddressChange(address: Address): void {
    this.mapLocation.latitude = address.geometry.location.lat();
    this.mapLocation.logitude = address.geometry.location.lng();
    this.zoom = 12;
    this.getLocation.emit(this.mapLocation);
  }
}
