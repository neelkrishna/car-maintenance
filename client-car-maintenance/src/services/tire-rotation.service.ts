import { Injectable, Inject } from '@angular/core';
import { TireRotation } from "../models/tire-rotation";
import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";


@Injectable()
export class TireRotationService {
  private _tireRotationsUrl = '/tireRotations';
  public tireRotationTimeArray: any;
  public tireRotations: TireRotation [];

  constructor(
    private _apiService: ApiService, private http:Http) {
  }

  getTireRotations(): Observable<TireRotation[]> {
    return this._apiService.get(this._tireRotationsUrl, '');
  }

  getTireRotation(id: number) {
    return this._apiService.get(`${this._tireRotationsUrl}/${id}`, '');
  }

  createOrUpdateTireRotation(tireRotation: TireRotation) {
    if(tireRotation.id){
      let updatedTireRotation: TireRotation;
      updatedTireRotation = new TireRotation;
      updatedTireRotation.id = tireRotation.id;
      updatedTireRotation.date = tireRotation.date;
      updatedTireRotation.mileage = tireRotation.mileage;
      updatedTireRotation.mileageNextDue = tireRotation.mileageNextDue;
      updatedTireRotation.cost = tireRotation.cost;
      updatedTireRotation.notes = tireRotation.notes;
      return this._apiService
        .put(`${this._tireRotationsUrl}/${tireRotation.id}`, updatedTireRotation);
    }else{
      return this._apiService
        .post(`${this._tireRotationsUrl}`, tireRotation);
    }
  }

  deleteTireRotation(id: number) {
    return this._apiService.delete(`${this._tireRotationsUrl}/${id}`, '');
  }

  searchTireRotations(search) {
    return this._apiService.post(this._tireRotationsUrl + '/search', search);
  }

}
