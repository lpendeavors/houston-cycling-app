import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Platform } from 'ionic-angular';

import { HomeWeatherComponent } from '../../components/home-weather/home-weather';
import { HomeSummaryComponent } from '../../components/home-summary/home-summary';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController
    ) {  }

}