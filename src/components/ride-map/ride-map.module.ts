import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RideMapComponent } from './ride-map';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    RideMapComponent,
  ],
  imports: [
    IonicPageModule.forChild(RideMapComponent),
    PipesModule
  ],
  exports: [
    RideMapComponent
  ]
})
export class RideMapComponentModule {}
