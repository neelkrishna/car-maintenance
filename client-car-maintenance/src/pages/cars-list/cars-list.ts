import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { CarDetailPage } from '../car-detail/car-detail';
import { CarCreateOrEditPage } from '../car-create-or-edit/car-create-or-edit';

@Component({
  selector: 'page-home',
  templateUrl: 'cars-list.html'
})
export class CarsListPage {
  cars: Car[];

  constructor(public navCtrl: NavController, public _carService: CarService) {

  }

  ionViewWillEnter() {
    this._carService.getCars().subscribe(cars => this.cars = cars);
  }

  createCar() {
    console.log("create clicked");
    this.navCtrl.push(CarCreateOrEditPage);

  }

  carSelected(car: Car){
  
    this.navCtrl.push(CarDetailPage, {
      car: car
    });
    
    
  }

}
