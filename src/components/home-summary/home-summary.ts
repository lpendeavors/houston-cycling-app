import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the HomeSummaryComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'home-summary',
  templateUrl: 'home-summary.html'
})
export class HomeSummaryComponent {

  selectedTab: string = 'statistics';
  isAndroid: boolean = false;

  constructor(
    public platform: Platform
  ) {  }

  summaryTabChanged(e): void {
    this.selectedTab = e.value;
  }
}
