/**
 * Used to display weather details. It is the single component that used to display single data
 */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataMeasurementsDegree, DataType } from 'src/app/dao/util/data-displayer.dao';
import { RestService } from 'src/app/rest.service';
import { DatePipe } from '../pipes/date-pipe/date.pipe';
import { OpenWeatherImagePipe } from '../pipes/open-weather-image-pipe/open-weather-image.pipe';
import { TimePipe } from '../pipes/time-pipe/time.pipe';

@Component({
  selector: 'app-data-displayer',
  templateUrl: './data-displayer.component.html',
  styleUrls: ['./data-displayer.component.css']
})
export class DataDisplayerComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() value: any;
  @Input() type: DataType;
  @Input() size: string;
  @Input() description: string;

  degree = "";

  // datatypes list
  TEXT = DataType.TEXT;
  DATE = DataType.DATE;
  TIME = DataType.TIME;
  IMAGE = DataType.IMAGE;
  TEMPERATURE = DataType.TEMPERATURE;
  PRECENTAGE = DataType.PRECENTAGE;
  PREASSURE = DataType.PREASSURE;
  HEIGHT = DataType.HEIGHT;
  SPEED = DataType.SPEED;

  // degree list
  TEMPERATURE_DEGREE = DataMeasurementsDegree.TEMPERATURE;
  PERCENTAGE_DEGREE = DataMeasurementsDegree.PERCENTAGE;
  PREASSURE_DEGREE = DataMeasurementsDegree.PREASSURE;
  HEIGHT_DEGREE = DataMeasurementsDegree.HEIGHT;
  SPEED_DEGREE = DataMeasurementsDegree.SPEED;

  /**
   * constructor
   * @param restService  RestService that used for http comunications
   */
  constructor(
    private restService: RestService,
  ) { }

  /**
   * ngOnInit method. Angular life cycle method
   */
  ngOnInit(): void {
      
  }

  /**
   * Trigger when any change happen to the inputs
   * @param changes changed values
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.manipulateValueWithDegree();
  }

  /**
   * Set the degree and manipulate that value.As an example if the value type is Preasure and value
   * is 34. Then it changed the value to 34 hPa and render it.
   */
  private manipulateValueWithDegree(): void {
    switch(this.type) {
      case this.TEMPERATURE:
        this.degree = this.TEMPERATURE_DEGREE;
        break;
      case this.SPEED:
        this.degree = this.SPEED_DEGREE;
        break;
      case this.PRECENTAGE:
        this.degree = this.PERCENTAGE_DEGREE;
        break;
      case this.PREASSURE:
        this.degree = this.PREASSURE_DEGREE;
        break;
      case this.HEIGHT:
        this.degree = this.HEIGHT_DEGREE;
        break;
      case this.DATE:
        if (this.value) {
          this.value = new DatePipe().transform(this.value);
        }
        break;
      case this.TIME:
        if (this.value) {
          this.value = new TimePipe().transform(this.value);
        }
        break;
      case this.IMAGE:
        if (this.value) {
          this.value = new OpenWeatherImagePipe(this.restService).transform(this.value, this.size);
        }
        break;
    }
  }
}
