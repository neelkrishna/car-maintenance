import { Injectable, Inject } from '@angular/core';
import { Car } from "../models/car";
import { OilChange } from "../models/oil-change";
import { Inspection } from "../models/inspection";
import { TireRotation } from "../models/tire-rotation";
import { OtherEntry } from "../models/other-entry";
import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";


@Injectable()
export class CarService {
  private _carsUrl = '/cars';
  public cars: Car [];

  constructor(
    private _apiService: ApiService, private http:Http) {
  }

  getCars(): Observable<Car[]> {
    return this._apiService.get(this._carsUrl, '').map(array => {
      let builtOutCarArray: Car[] = [];
      for (let ele of array) {
        builtOutCarArray.push(ele);
      };

      return builtOutCarArray;
    }, this);
  }

  getCar(id: number) {
    return this._apiService.get(`${this._carsUrl}/${id}`, '');
  }

  createOrUpdateCar(car: Car) {
    if(car.id){
      let updatedCar: Car;
      updatedCar = new Car;
      updatedCar.id = car.id;
      updatedCar.make = car.make;
      updatedCar.model = car.model;
      updatedCar.year = car.year;
      updatedCar.miles = car.miles;
      updatedCar.notes = car.notes;
      return this._apiService
        .put(`${this._carsUrl}/${car.id}`, updatedCar);
    }else{
      return this._apiService
        .post(`${this._carsUrl}`, car);
    }
  }

  deleteCar(id: number) {
    return this._apiService.delete(`${this._carsUrl}/${id}`, '');
  }

  searchCars(search) {
    return this._apiService.post(this._carsUrl + '/search', search);
  }

  getTireRotationsForCar(car: Car){
    return this._apiService.get(`${this._carsUrl}/${car.id}/tireRotations`, '');
  }

  addTireRotationToCar(tireRotation: TireRotation, car: Car){
    return this._apiService.post(`${this._carsUrl}/${car.id}/${tireRotation.id}`);
  }

  deleteTireRotationFromCar(tireRotation: TireRotation, car: Car){
    return this._apiService.delete(`${this._carsUrl}/${car.id}/${tireRotation.id}`, '');
  }

  getInspectionsForCar(car: Car){
    return this._apiService.get(`${this._carsUrl}/${car.id}/inspections`, '');
  }

  addInspectionToCar(inspection: Inspection, car: Car){
    return this._apiService.post(`${this._carsUrl}/${car.id}/${inspection.id}`);
  }

  deleteInspectionFromCar(inspection: Inspection, car: Car){
    return this._apiService.delete(`${this._carsUrl}/${car.id}/${inspection.id}`, '');
  }

  getOilChangesForCar(car: Car){
    return this._apiService.get(`${this._carsUrl}/${car.id}/oilChanges`, '');
  }

  addOilChangeToCar(oilChange: OilChange, car: Car){
    return this._apiService.post(`${this._carsUrl}/${car.id}/${oilChange.id}`);
  }

  deleteOilChangeFromCar(oilChange: OilChange, car: Car){
    return this._apiService.delete(`${this._carsUrl}/${car.id}/${oilChange.id}`, '');
  }

  getOtherEntriesForCar(car: Car){
    return this._apiService.get(`${this._carsUrl}/${car.id}/otherEntries`, '');
  }

  addOtherEntryToCar(otherEntry: OtherEntry, car: Car){
    return this._apiService.post(`${this._carsUrl}/${car.id}/${otherEntry.id}`);
  }

  deleteOtherEntryFromCar(otherEntry: OtherEntry, car: Car){
    return this._apiService.delete(`${this._carsUrl}/${car.id}/${otherEntry.id}`, '');
  }

}
