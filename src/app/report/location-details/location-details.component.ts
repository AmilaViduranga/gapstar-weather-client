/**
 * Used to display location details like latitude, logitude, location name
 */

import { Component, Input, OnInit } from '@angular/core';
import type { LocationReport } from 'src/app/dao/report/location.dao';
import { DataType } from 'src/app/dao/util/data-displayer.dao';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  TEXT = DataType.TEXT;
  TIME = DataType.TIME;
  DATE = DataType.DATE;
  
  @Input() locationReport: LocationReport;

  constructor() { }

  ngOnInit(): void {
  }

}
