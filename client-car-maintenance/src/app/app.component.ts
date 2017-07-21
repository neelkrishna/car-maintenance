import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CarsListPage } from '../pages/cars-list/cars-list';
import { OilChangesListPage } from '../pages/oil-changes-list/oil-changes-list';
import { TireRotationsListPage } from '../pages/tire-rotations-list/tire-rotations-list';
import { InspectionsListPage } from '../pages/inspections-list/inspections-list';
import { OtherEntriesListPage } from '../pages/other-entries-list/other-entries-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CarsListPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Cars', component: CarsListPage },
      { title: 'Oil Changes', component: OilChangesListPage },
      { title: 'Tire Rotations', component: TireRotationsListPage },
      { title: 'Inspections', component: InspectionsListPage },
      { title: 'Other Entries', component: OtherEntriesListPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
