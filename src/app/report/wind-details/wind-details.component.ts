import { Component, Input, OnInit } from '@angular/core';
import type { WindReport } from 'src/app/dao/report/wind.dao';
import { DataType } from 'src/app/dao/util/data-displayer.dao';

@Component({
  selector: 'app-wind-details',
  templateUrl: './wind-details.component.html',
  styleUrls: ['./wind-details.component.css']
})
export class WindDetailsComponent implements OnInit {

  SPEED = DataType.SPEED;

  @Input() windReport: WindReport;
  
  constructor() { }

  ngOnInit(): void {
  }
}
