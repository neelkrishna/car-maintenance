import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OilChangeService } from '../../services/oil-change.service';
import { OilChange } from '../../models/oil-change';

/**
 * Generated class for the OilChangeCreateOrEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-oil-change-create-or-edit',
  templateUrl: 'oil-change-create-or-edit.html',
})
export class OilChangeCreateOrEditPage {
  oilChange: OilChange;
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _oilChangeService: OilChangeService) {
    this.oilChange = this.navParams.get('oilChange') || new OilChange;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OilChangeCreateOrEditPage');
  }

  cancelClicked() {
    this.navCtrl.pop();
  }

  saveClicked() {
    this._oilChangeService.createOrUpdateOilChange(this.oilChange)
      .subscribe(res => this.response = res);
      this.navCtrl.pop();
  }
}
