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
  
  @Input() locationReport: LocationReport;

  constructor() { }

  ngOnInit(): void {
  }

}
