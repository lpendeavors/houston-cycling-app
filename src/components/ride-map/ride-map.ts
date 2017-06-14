import { Component } from '@angular/core';

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
export class RideMapComponent {

  text: string;

  constructor() {
    console.log('Hello RideMapComponent Component');
    this.text = 'Hello World';
  }

}
