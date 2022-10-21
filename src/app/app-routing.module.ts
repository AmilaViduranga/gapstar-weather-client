import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherPortalComponent } from './weather-portal/weather-portal.component';

const routes: Routes = [
  {
    path: 'current-weather', component: WeatherPortalComponent
  },
  { 
    path: '', redirectTo: '/current-weather', pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
