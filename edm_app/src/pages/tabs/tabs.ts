import { Component } from '@angular/core';

import { AllPage } from '../all/all';
import { NightPage } from '../night/night';
import { DayPage } from '../day/day';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = AllPage;
    tab2Root: any = DayPage;
  tab3Root: any = NightPage;


  constructor() {

  }
}
