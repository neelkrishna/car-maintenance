import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TireRotationService } from '../../services/tire-rotation.service';
import { TireRotation } from '../../models/tire-rotation';

/**
 * Generated class for the TireRotationCreateOrEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tire-rotation-create-or-edit',
  templateUrl: 'tire-rotation-create-or-edit.html',
})
export class TireRotationCreateOrEditPage {
  tireRotation: TireRotation;
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _tireRotationService: TireRotationService) {
    this.tireRotation = this.navParams.get('tireRotation') || new TireRotation;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TireRotationCreateOrEditPage');
  }

  cancelClicked() {
    this.navCtrl.pop();
  }

  saveClicked() {
    this._tireRotationService.createOrUpdateTireRotation(this.tireRotation)
      .subscribe(res => this.response = res);
      this.navCtrl.pop();
  }
}
