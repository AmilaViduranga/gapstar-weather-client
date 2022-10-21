import { Component, Input, OnInit } from '@angular/core';
import { GeneralReport } from 'src/app/dao/report/general.dao';
import { DataType } from 'src/app/dao/util/data-displayer.dao';

@Component({
  selector: 'app-general-weather',
  templateUrl: './general-weather.component.html',
  styleUrls: ['./general-weather.component.css']
})
export class GeneralWeatherComponent implements OnInit {

  IMAGE = DataType.IMAGE;
  TEMPERATURE = DataType.TEMPERATURE;
  PRECENTAGE = DataType.PRECENTAGE;
  PREASSURE = DataType.PREASSURE;
  HEIGHT = DataType.HEIGHT;
  
  @Input() generalReport: GeneralReport;

  constructor() { }

  ngOnInit(): void {
  }
}
