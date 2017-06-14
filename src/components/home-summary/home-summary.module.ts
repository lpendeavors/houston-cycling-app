import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeSummaryComponent } from './home-summary';

@NgModule({
  declarations: [
    HomeSummaryComponent,
  ],
  imports: [
    IonicPageModule.forChild(HomeSummaryComponent),
  ],
  exports: [
    HomeSummaryComponent
  ]
})
export class HomeSummaryComponentModule {}
