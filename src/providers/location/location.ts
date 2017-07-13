import { Injectable, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationProvider {

  public locationUpdate: Subject<any> = new Subject();

  private watch: any;

  constructor(
    private platform: Platform,
    private zone: NgZone,
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation
  ) {}

  getPosition(): Promise<BackgroundGeolocationResponse> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        this.geolocation.getCurrentPosition().then((pos) => {
          return resolve(pos.coords);
        },
        (error) => {
          reject(error.message || error);
        });
      })
    })
  }

  startTracking(): void {
    // Background Tracking
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 0,
      distanceFilter: 0,
      debug: true, // Development only

      // Android
      notificationTitle: 'Houston Cycling',
      notificationText: 'Your location is being tracked in the background',
      interval: 200,
      locationProvider: 0,
      stopOnStillActivity: false,

      // iOS
      activityType: 'Fitness',
      pauseLocationUpdates: false
    };

    this.platform.ready().then(() => {
      this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
        this.zone.run(() => {
          this.locationUpdate.next(location);
        });
        this.backgroundGeolocation.finish();
      }, (error) => {
        console.log(error);
      });

      // Turn on the background geolocation system
      this.backgroundGeolocation.start();

      // Foregound tracking
      let options = {
        frequency: 2000,
        enableHighAccuracy: true,
        maxAge: 0
      };

      this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
        this.zone.run(() => {
          this.locationUpdate.next(position);
        });
      });
    });
  }

  stopTracking(): void {
    this.backgroundGeolocation.stop();
  }
}
