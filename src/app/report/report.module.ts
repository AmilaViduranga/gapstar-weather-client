import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralWeatherComponent } from './general-weather/general-weather.component';
import { SunRiseSetComponent } from './sun-rise-set/sun-rise-set.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { WindDetailsComponent } from './wind-details/wind-details.component';
import { HistoryComponent } from './history/history.component';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [
    GeneralWeatherComponent,
    SunRiseSetComponent,
    LocationDetailsComponent,
    WindDetailsComponent,
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    UtilsModule,
  ],
  exports: [
    GeneralWeatherComponent,
    SunRiseSetComponent,
    LocationDetailsComponent,
    WindDetailsComponent,
    HistoryComponent,
  ]
})
export class ReportModule { }
