import { Component } from '@angular/core';
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
export class HomeWeatherComponent {

  text: string;

  constructor(
    public weather: WeatherProvider
  ) {
    console.log(this.weather.getWeather());
  }

}
