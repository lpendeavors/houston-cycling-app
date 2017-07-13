import { Component, AfterViewInit, NgZone, Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { RideProvider } from '../../providers/ride/ride';
import { Observable } from 'rxjs/Rx';
import { UUID } from 'angular2-uuid';

import 'leaflet';

/**
 * Generated class for the RideMapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ride-map',
  templateUrl: 'ride-map.html'
})
export class RideMapComponent implements AfterViewInit {

  private currentPosMarker: L.Marker;
  private mapId: string;
  private map: L.Map;
  private path: L.Polyline;

  constructor(
    public location: LocationProvider,
    public ride: RideProvider,
    public zone: NgZone,
    public alert: AlertController
  ) {
    this.mapId = UUID.UUID();
  }

  private createMap(): void {
    this.map = new L.Map(this.mapId);
    this.setView();
  }

  private setView(): void {
    this.location.getPosition().then(pos => {
      this.map.setView(new L.LatLng(pos.latitude, pos.longitude), 14);
      this.map.panBy([0, -50]);
      this.addTiles();
      this.addCurrentPosMarker(pos);
    });
  }

  private addTiles(): void {
    new L.TileLayer("http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png", {
      attribution: 'Todo',
      minZoom: 9,
      maxZoom: 18
    }).addTo(this.map);
  }

  private addCurrentPosMarker(location): void {
    this.currentPosMarker = new L.Marker(new L.LatLng(location.latitude, location.longitude)).addTo(this.map);
    this.createPath();
  }

  private updateCurrentPosMarker(location): void {
    this.currentPosMarker.setLatLng(new L.LatLng(location.latitude, location.longitude));
    console.log('updated marker');
  }

  private createPath(): void {
    this.path = new L.Polyline([], { color: 'red', weight: 5 }).addTo(this.map);

    let ok = this.alert.create({
      title: 'works',
      buttons: ['OK']
    });
    ok.present();
  }

  ngAfterViewInit(): void {
    this.createMap();

    this.ride.rideUpdate.subscribe(ride => {

      this.zone.run(() => {
        // Update this.path array with new ride data
        this.path.setLatLngs(ride);
      });
    });

    this.ride.currentLocationUpdate.subscribe(() => {
      this.updateCurrentPosMarker(this.ride.currentLocation);
    });
  }
}
