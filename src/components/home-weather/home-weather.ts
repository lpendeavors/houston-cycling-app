import { Component, OnInit } from '@angular/core';
import { LocationProvider } from '../../providers/location/location';
import { WeatherProvider } from '../../providers/weather/weather';

/**
 * Generated class for the HomeWeatherComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'home-weather',
  templateUrl: 'home-weather.html'
})
export class HomeWeatherComponent implements OnInit {

  currentWeather: Object;

  constructor(
    public location: LocationProvider,
    public weather: WeatherProvider
  ) {}

  ngOnInit(): void {
    // Get current location
    this.location.getPosition().then(pos => {
      console.log(pos);
      // Get weather for current location
      this.weather.getWeather(pos.latitude, pos.longitude).then(res => {
        console.log(res);
        this.currentWeather = res;
      });
    })
  }
}
