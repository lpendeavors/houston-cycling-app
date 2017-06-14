import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RideMapComponent } from './ride-map';

@NgModule({
  declarations: [
    RideMapComponent,
  ],
  imports: [
    IonicPageModule.forChild(RideMapComponent),
  ],
  exports: [
    RideMapComponent
  ]
})
export class RideMapComponentModule {}
