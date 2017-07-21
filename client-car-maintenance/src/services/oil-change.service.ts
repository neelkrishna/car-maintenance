import { Injectable, Inject } from '@angular/core';
import { OilChange } from "../models/oil-change";
import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";


@Injectable()
export class OilChangeService {
  private _oilChangesUrl = '/oilChanges';
  public oilChangeTimeArray: any;
  public oilChanges: OilChange [];

  constructor(
    private _apiService: ApiService, private http:Http) {
  }

  getOilChanges(): Observable<OilChange[]> {
    return this._apiService.get(this._oilChangesUrl, '');
  }

  getOilChange(id: number) {
    return this._apiService.get(`${this._oilChangesUrl}/${id}`, '');
  }

  createOrUpdateOilChange(oilChange: OilChange) {
    if(oilChange.id){
      let updatedOilChange: OilChange;
      updatedOilChange = new OilChange;
      updatedOilChange.id = oilChange.id;
      updatedOilChange.date = oilChange.date;
      updatedOilChange.mileage = oilChange.mileage;
      updatedOilChange.mileageNextDue = oilChange.mileageNextDue;
      updatedOilChange.cost = oilChange.cost;
      updatedOilChange.notes = oilChange.notes;
      return this._apiService
        .put(`${this._oilChangesUrl}/${oilChange.id}`, updatedOilChange);
    }else{
      return this._apiService
        .post(`${this._oilChangesUrl}`, oilChange);
    }
  }

  deleteOilChange(id: number) {
    return this._apiService.delete(`${this._oilChangesUrl}/${id}`, '');
  }

  searchOilChanges(search) {
    return this._apiService.post(this._oilChangesUrl + '/search', search);
  }

}
