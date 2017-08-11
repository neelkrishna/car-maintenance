import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Inspection } from '../../models/inspection';
import { InspectionCreateOrEditPage } from '../inspection-create-or-edit/inspection-create-or-edit';
import { InspectionDetailPage } from '../inspection-detail/inspection-detail';
import { CarService } from '../../services/car.service';
import { InspectionService } from '../../services/inspection.service';
/**
 * Generated class for the InspectionsListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-inspections-list',
  templateUrl: 'inspections-list.html',
})
export class InspectionsListPage {

  inspections: Inspection[]

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public _inspectionService: InspectionService, public _carService: CarService) {
      this._inspectionService.getInspections().subscribe(inspections => {
      this.inspections = inspections;
      this.getCarsForInspections(this.inspections);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionsListPage');
  }

  ionViewWillEnter() {
    
  }

  createInspection() {
    console.log("create clicked");
    this.navCtrl.push(InspectionCreateOrEditPage);

  }

  inspectionSelected(inspection: Inspection){
    this.navCtrl.push(InspectionDetailPage, {
      inspection: inspection
    });
  }

  getCarsForInspections(inspections){
    for(let inspection of inspections){
      inspection.car = {make: '', model: '', year: 0}
    }
    for(let inspection of inspections){
      this._carService.getCar(inspection.CarId).subscribe(car => inspection.car = car);
    }
  }

}
