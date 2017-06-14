import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeWeatherComponent } from './home-weather';

@NgModule({
  declarations: [
    HomeWeatherComponent,
  ],
  imports: [
    IonicPageModule.forChild(HomeWeatherComponent),
  ],
  exports: [
    HomeWeatherComponent
  ]
})
export class HomeWeatherComponentModule {}
