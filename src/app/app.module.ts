import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { UtilsModule } from './utils/utils.module';
import { ReportModule } from './report/report.module';
import { AlertModule } from 'ngx-alerts';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AppComponent } from './app.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { environment } from 'src/environments/environment';
import { WeatherPortalComponent } from './weather-portal/weather-portal.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent,
    WeatherPortalComponent,
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
    NgxSpinnerModule,
    GooglePlaceModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
