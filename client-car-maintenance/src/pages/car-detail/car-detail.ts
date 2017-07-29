import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { CarService } from '../../services/car.service';

import { Car } from '../../models/car';
import { OilChange } from '../../models/oil-change';

import { OilChangeCreateOrEditPage } from '../oil-change-create-or-edit/oil-change-create-or-edit';
import { TireRotationCreateOrEditPage } from '../tire-rotation-create-or-edit/tire-rotation-create-or-edit';
import { InspectionCreateOrEditPage } from '../inspection-create-or-edit/inspection-create-or-edit';
import { OtherEntryCreateOrEditPage } from '../other-entry-create-or-edit/other-entry-create-or-edit';
/**
 * Generated class for the CarDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-car-detail',
  templateUrl: 'car-detail.html',
})
export class CarDetailPage {
  car: Car;
  newEntryType: any;
  oilChangesForCar: OilChange[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public _carService: CarService
    , public alertCtrl: AlertController) {
    this.car = this.navParams.get('car') || null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarDetailPage');
  }

  ionViewWillEnter(){
    this.car = this.navParams.get('car') || null;
    this.oilChangesForCar = [{date: "No oilChanges"}];
    this._carService.getOilChangesForCar(this.car).subscribe(res => {
      this.oilChangesForCar = res;
    });
  }

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Entry type:');

    alert.addInput({
      type: 'radio',
      label: 'Oil Change',
      value: 'oilChange',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Inspection',
      value: 'inspection',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Tire Rotation',
      value: 'tireRotation',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Other Entry',
      value: 'otherEntry',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.newEntryType = data;
        this.createNewEntry();
      }
    });
    alert.present();
  }

  createNewEntry(){
    if(this.newEntryType == 'oilChange'){
      this.navCtrl.push(OilChangeCreateOrEditPage);
    }
    else if(this.newEntryType == 'tireRotation'){
      this.navCtrl.push(TireRotationCreateOrEditPage);
    }
    else if(this.newEntryType == 'otherEntry'){
      this.navCtrl.push(OtherEntryCreateOrEditPage);
    }
    else if(this.newEntryType == 'inspection'){
      this.navCtrl.push(InspectionCreateOrEditPage);
    }
  }

}
