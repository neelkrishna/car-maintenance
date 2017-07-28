import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';

/**
 * Generated class for the CarCreateOrEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-car-create-or-edit',
  templateUrl: 'car-create-or-edit.html',
})
export class CarCreateOrEditPage {
  car: Car;
  response: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _carService: CarService) {
    this.car = this.navParams.get('car') || new Car;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarCreateOrEditPage');
  }

  cancelClicked() {
    this.navCtrl.pop();
  }

  saveClicked() {
    this._carService.createOrUpdateCar(this.car)
      .subscribe(res => this.response = res);
      this.navCtrl.pop();
  }
}
