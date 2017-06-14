import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocationProvider } from '../location/location';

import 'rxjs/add/operator/toPromise';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherProvider {

  private apiUrl: string = 'http://api.openweathermap.org/data/2.5/weather?';
  private key: string = '066e7359820f382914a2eff95cad643a';

  constructor(
    public http: Http,
    public location: LocationProvider ) {}

  getWeather(): void {
    this.location.getPosition().then(pos => {
      const url = `${this.apiUrl}lat=${pos.latitude}&lon=${pos.longitude}&appid=${this.key}&units=imperial`;
      return this.http.get(url).toPromise().then(response => response.json()).catch(this.handleError);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
