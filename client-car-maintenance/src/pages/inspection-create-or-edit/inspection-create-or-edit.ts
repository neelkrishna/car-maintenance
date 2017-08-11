import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InspectionService } from '../../services/inspection.service';
import { Inspection } from '../../models/inspection';

/**
 * Generated class for the InspectionCreateOrEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-inspection-create-or-edit',
  templateUrl: 'inspection-create-or-edit.html',
})
export class InspectionCreateOrEditPage {
  inspection: Inspection;
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _inspectionService: InspectionService) {
    this.inspection = this.navParams.get('inspection') || new Inspection;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionCreateOrEditPage');
  }

  cancelClicked() {
    this.navCtrl.pop();
  }

  saveClicked() {
    this._inspectionService.createOrUpdateInspection(this.inspection)
      .subscribe(res => this.response = res);
      this.navCtrl.pop();
  }
}
