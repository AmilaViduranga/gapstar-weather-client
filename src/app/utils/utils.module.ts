import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataDisplayerComponent } from './data-displayer/data-displayer.component';

import { DatePipe } from './pipes/date.pipe';
import { OpenWeatherImagePipe } from './pipes/open-weather-image.pipe';
import { TimePipe } from './pipes/time.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DataDisplayerComponent,
    DatePipe,
    OpenWeatherImagePipe,
    TimePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    DataDisplayerComponent
  ]
})
export class UtilsModule { }
