import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { RidePage } from '../pages/ride/ride';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

import { HomeWeatherComponent } from '../components/home-weather/home-weather';
import { HomeSummaryComponent } from '../components/home-summary/home-summary';
import { RideMapComponent } from '../components/ride-map/ride-map';
import { RideProvider } from '../providers/ride/ride';
import { LocationProvider } from '../providers/location/location';
import { ProfileProvider } from '../providers/profile/profile';
import { WeatherProvider } from '../providers/weather/weather';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    RidePage,
    TabsPage,
    HomeWeatherComponent,
    HomeSummaryComponent,
    RideMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    RidePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RideProvider,
    LocationProvider,
    ProfileProvider,
    WeatherProvider
  ]
})
export class AppModule {}
