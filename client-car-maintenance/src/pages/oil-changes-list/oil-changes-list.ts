import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OilChange } from '../../models/oil-change';
import { OilChangeCreateOrEditPage } from '../oil-change-create-or-edit/oil-change-create-or-edit';
import { OilChangeDetailPage } from '../oil-change-detail/oil-change-detail';
import { CarService } from '../../services/car.service';
import { OilChangeService } from '../../services/oil-change.service';
/**
 * Generated class for the OilChangesListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-oil-changes-list',
  templateUrl: 'oil-changes-list.html',
})
export class OilChangesListPage {

  oilChanges: OilChange[]

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public _oilChangeService: OilChangeService, public _carService: CarService) {
      this._oilChangeService.getOilChanges().subscribe(oilChanges => {
      this.oilChanges = oilChanges;
      this.getCarsForOilChanges(this.oilChanges);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OilChangesListPage');
  }

  ionViewWillEnter() {
    
  }

  createOilChange() {
    console.log("create clicked");
    this.navCtrl.push(OilChangeCreateOrEditPage);

  }

  oilChangeSelected(oilChange: OilChange){
    this.navCtrl.push(OilChangeDetailPage, {
      oilChange: oilChange
    });
  }

  getCarsForOilChanges(oilChanges){
    for(let oilChange of oilChanges){
      oilChange.car = {make: '', model: '', year: 0}
    }
    for(let oilChange of oilChanges){
      this._carService.getCar(oilChange.CarId).subscribe(car => oilChange.car = car);
    }
  }

}
