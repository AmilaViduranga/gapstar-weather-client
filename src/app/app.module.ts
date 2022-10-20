import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { environment } from 'src/environments/environment';
import { CurrentWeatherComponent } from './weather-portal/weather-portal.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UtilsModule } from './utils/utils.module';
import { ReportModule } from './report/report.module';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    CurrentWeatherComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey,
      libraries: ['places']
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    UtilsModule,
    ReportModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
