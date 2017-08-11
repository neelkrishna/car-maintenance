import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TireRotation } from '../../models/tire-rotation';
import { TireRotationCreateOrEditPage } from '../tire-rotation-create-or-edit/tire-rotation-create-or-edit';
import { TireRotationDetailPage } from '../tire-rotation-detail/tire-rotation-detail';
import { CarService } from '../../services/car.service';
import { TireRotationService } from '../../services/tire-rotation.service';
/**
 * Generated class for the TireRotationsListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tire-rotations-list',
  templateUrl: 'tire-rotations-list.html',
})
export class TireRotationsListPage {

  tireRotations: TireRotation[]

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public _tireRotationService: TireRotationService, public _carService: CarService) {
      this._tireRotationService.getTireRotations().subscribe(tireRotations => {
      this.tireRotations = tireRotations;
      this.getCarsForTireRotations(this.tireRotations);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TireRotationsListPage');
  }

  ionViewWillEnter() {
    
  }

  createTireRotation() {
    console.log("create clicked");
    this.navCtrl.push(TireRotationCreateOrEditPage);

  }

  tireRotationSelected(tireRotation: TireRotation){
    this.navCtrl.push(TireRotationDetailPage, {
      tireRotation: tireRotation
    });
  }

  getCarsForTireRotations(tireRotations){
    for(let tireRotation of tireRotations){
      tireRotation.car = {make: '', model: '', year: 0}
    }
    for(let tireRotation of tireRotations){
      this._carService.getCar(tireRotation.CarId).subscribe(car => tireRotation.car = car);
    }
  }

}
