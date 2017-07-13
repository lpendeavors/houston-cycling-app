import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

import { LocationProvider } from '../location/location';
import { RideModel } from '../../models/ride/ride';

/*
  Generated class for the RideProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RideProvider {

  public ride: RideModel = new RideModel();
  public ticks: number = 0;
  public currentSpeed: number = 0;
  public rideHistory: RideModel[] = [];
  public inProgress: boolean = false;
  public currentLocation: any;

  public currentLocationUpdate: Subject<any> = new Subject();
  public rideUpdate: Subject<any> = new Subject();
  public rideStarted: Subject<any> = new Subject();
  public rideEnded: Subject<any> = new Subject();

  private timer = Observable.timer(0, 1000);
  private speeds: number[] = [];
  private lastCoord: any;
  private subscription: any;

  private apiUrl = 'http://cycle-hou.larryeparks.com/api/trips/';

  constructor(
    public http: Http,
    public zone: NgZone,
    public alert: AlertController,
    public storage: Storage,
    public location: LocationProvider
  ) {
    // Set currentLocation
    this.location.getPosition().then(pos => {
      this.currentLocation = pos.coords;
    });

    // Subscribe to location update events
    this.location.locationUpdate.subscribe(pos => {

      // Update current location
      this.zone.run(() => {
        this.currentLocation = pos.coords;
        
        // Trigger currentLocationUpdate event
        this.currentLocationUpdate.next();
      });

      if (this.inProgress) {
        // Add location to ride.points array
        this.ride.addCoord(pos.latitude, pos.longitude);

        // Check for speed
        if (pos.speed) {
          this.currentSpeed = pos.speed * 2.23694 // Convert meters/sec to miles/hr
          this.calculateAvgSpeed(this.currentSpeed);
        }

        // Calculate distance
        if (this.lastCoord.lat && this.lastCoord.lng) {
          this.calculateDistance(this.lastCoord.lat, this.lastCoord.lng, pos.latitude, pos.longitude);
        }

        // Call rideUpdate event with new coordinates
        this.rideUpdate.next(this.ride.points);
        
        // Update lastCoord variable
        this.lastCoord = { lat: pos.latitude, lng: pos.longitude };
      }
    });

    // Check for ride history
    this.storage.ready().then(() => {
      storage.get('rides').then(rides => {
        this.rideHistory = rides || [];
      });
    });

    // Start location tracking
    this.location.startTracking();
  }

  private startRide(): void {
    // Update inProgress indicator
    this.zone.run(() => {
      this.inProgress = true;
    })
    
    // Trigger ride started event
    this.rideStarted.next();

    // Start ride timer
    this.subscription = this.timer.subscribe(t => {
      this.zone.run(() => {
        this.ticks = t;
      });
    });

    // Set ride.startTime
    this.ride.startTime = new Date(Date.now());

    // Add ride.currentLocation as first point
    this.ride.addCoord(this.currentLocation.latitude, this.currentLocation.longitude);
  }

  public endRide(): void {
    // Stop tracking location
    this.location.stopTracking();

    // Call rideEnd event
    this.rideEnded.next();

    // Update inProgress indicator
    this.zone.run(() => {
      this.inProgress = false;
    });

    // Stop ride timer and store value
    this.subscription.unsubscribe();
    this.ride.duration = this.ticks;
    
    // Set ride.endTime
    this.ride.endTime = new Date(Date.now());

    this.saveRide();
    console.log(this.ride);
  }

  public askRideType(): void {
    const rideTypes = ['Work', 'School', 'Leisure', 'Excersise', 'Errands'];
    
    // Create popup alert
    let list = this.alert.create();
    list.setTitle('Select ride type');

    // Add input for each type
    rideTypes.forEach((type) => {
      list.addInput({
        type: 'radio',
        label: type,
        value: type.toLocaleLowerCase()
      });
    });
  
    // Add buttons
    list.addButton('Cancel');
    list.addButton({
      text: 'Begin',
      handler: data => {
        // Ensure selection
        if (data) {
          this.ride.type = data;
          this.startRide();
        }
      }
    });

    // Show alert
    list.present();
  }

  private saveRide(): Promise<any> {
    return this.http
            .post(this.apiUrl, this.ride)
            .toPromise()
            .then(response => {
              // Update ride object with _id from api
              let uploadedRide = response.json();
              this.ride.id = uploadedRide._id;

              // Save ride to device
              this.saveLocal();
            })
            .catch(err => console.error(err));
  }

  private saveLocal(): Promise<any> {
    return new Promise((resolve, reject) => {
      // Add ride  to rideHistory array
      this.rideHistory.push(this.ride);

      // Ensure storage is accessible
      this.storage.ready().then(() => {
        // Save rideHistory array to storage
        this.storage.set('rides', this.rideHistory);

        // Return the promise
        resolve(this.rideHistory);

        // Reset ride
        this.resetRide();
      });
    });
  }

  private resetRide(): void {
    // Reset ride object
    this.ride = new RideModel();

    // Reset other variables
    this.currentSpeed = 0;
    this.ticks = 0;
    this.lastCoord = 0;
    this.speeds = [];
  }

  private calculateDistance(prevLat: number, prevLng: number, curLat: number, curLng: number): void {
    // Calculate distance between coodinate pairs
    const radlat1 = Math.PI * prevLat / 180;
    const radlat2 = Math.PI * curLat / 180;
    const theta = prevLng - curLng;
    const radtheta = Math.PI * theta / 180;

    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;

    // Add to total distance
    this.zone.run(() => {
      this.ride.distance += dist;
    });
  }

  private calculateAvgSpeed(curSpeed: number): void {
    // Add new speed to array
    this.speeds.push(curSpeed);

    // Calculate the average
    let sum = 0;
    this.speeds.forEach(s => sum += s);
    this.ride.avgSpeed = sum / this.speeds.length;
  }

}
