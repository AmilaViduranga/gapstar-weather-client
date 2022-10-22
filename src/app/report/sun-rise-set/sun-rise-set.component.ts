/**
 * used to display sun raise and sun set valued
 */
import { Component, Input, OnInit } from '@angular/core';
import type { SunRiseSetReport } from 'src/app/dao/report/sun-rise-set.dao';
import { DataType } from 'src/app/dao/util/data-displayer.dao';

@Component({
  selector: 'app-sun-rise-set',
  templateUrl: './sun-rise-set.component.html',
  styleUrls: ['./sun-rise-set.component.css']
})
export class SunRiseSetComponent implements OnInit {

  TIME = DataType.TIME;
  @Input() sunRiseSetReport: SunRiseSetReport;
  
  constructor() { }

  ngOnInit(): void {
  }

}
