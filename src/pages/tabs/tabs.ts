import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { RidePage } from '../ride/ride';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RidePage;
  tab3Root = ProfilePage;

  constructor() {
    
  }
}
