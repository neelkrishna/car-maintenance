import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OtherEntry } from '../../models/other-entry';
import { OtherEntryCreateOrEditPage } from '../other-entry-create-or-edit/other-entry-create-or-edit';
import { OtherEntryDetailPage } from '../other-entry-detail/other-entry-detail';
import { CarService } from '../../services/car.service';
import { OtherEntryService } from '../../services/other-entry.service';
/**
 * Generated class for the OtherEntriesListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-other-entries-list',
  templateUrl: 'other-entries-list.html',
})
export class OtherEntriesListPage {

  otherEntries: OtherEntry[]

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public _otherEntryService: OtherEntryService, public _carService: CarService) {
      this._otherEntryService.getOtherEntries().subscribe(otherEntries => {
      this.otherEntries = otherEntries;
      this.getCarsForOtherEntries(this.otherEntries);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherEntriesListPage');
  }

  ionViewWillEnter() {
    
  }

  createOtherEntry() {
    console.log("create clicked");
    this.navCtrl.push(OtherEntryCreateOrEditPage);

  }

  otherEntrySelected(otherEntry: OtherEntry){
    this.navCtrl.push(OtherEntryDetailPage, {
      otherEntry: otherEntry
    });
  }

  getCarsForOtherEntries(otherEntries){
    for(let otherEntry of otherEntries){
      otherEntry.car = {make: '', model: '', year: 0}
    }
    for(let otherEntry of otherEntries){
      this._carService.getCar(otherEntry.CarId).subscribe(car => otherEntry.car = car);
    }
  }

}
