import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CarService } from '../../services/car.service';

import { Car } from '../../models/car';
import { OilChange } from '../../models/oil-change';

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
  oilChangesForCar: OilChange[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public _carService: CarService) {
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
      console.log("res: " + JSON.stringify(res));
      console.log("this.oilChangesForCar: " + JSON.stringify(this.oilChangesForCar));
    });
  }

}
