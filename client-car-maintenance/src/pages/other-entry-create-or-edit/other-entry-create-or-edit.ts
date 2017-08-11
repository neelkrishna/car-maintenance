import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OtherEntryService } from '../../services/other-entry.service';
import { OtherEntry } from '../../models/other-entry';

/**
 * Generated class for the OtherEntryCreateOrEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-other-entry-create-or-edit',
  templateUrl: 'other-entry-create-or-edit.html',
})
export class OtherEntryCreateOrEditPage {
  otherEntry: OtherEntry;
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _otherEntryService: OtherEntryService) {
    this.otherEntry = this.navParams.get('otherEntry') || new OtherEntry;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherEntryCreateOrEditPage');
  }

  cancelClicked() {
    this.navCtrl.pop();
  }

  saveClicked() {
    this._otherEntryService.createOrUpdateOtherEntry(this.otherEntry)
      .subscribe(res => this.response = res);
      this.navCtrl.pop();
  }
}
