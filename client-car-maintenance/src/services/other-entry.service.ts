import { Injectable, Inject } from '@angular/core';
import { OtherEntry } from "../models/other-entry";
import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";


@Injectable()
export class OtherEntryService {
  private _otherEntrysUrl = '/otherEntrys';
  public otherEntryTimeArray: any;
  public otherEntrys: OtherEntry [];

  constructor(
    private _apiService: ApiService, private http:Http) {
  }

  getOtherEntrys(): Observable<OtherEntry[]> {
    return this._apiService.get(this._otherEntrysUrl, '');
  }

  getOtherEntry(id: number) {
    return this._apiService.get(`${this._otherEntrysUrl}/${id}`, '');
  }

  createOrUpdateOtherEntry(otherEntry: OtherEntry) {
    if(otherEntry.id){
      let updatedOtherEntry: OtherEntry;
      updatedOtherEntry = new OtherEntry;
      updatedOtherEntry.id = otherEntry.id;
      updatedOtherEntry.date = otherEntry.date;
      updatedOtherEntry.mileage = otherEntry.mileage;
      updatedOtherEntry.cost = otherEntry.cost;
      updatedOtherEntry.description = otherEntry.description;
      return this._apiService
        .put(`${this._otherEntrysUrl}/${otherEntry.id}`, updatedOtherEntry);
    }else{
      return this._apiService
        .post(`${this._otherEntrysUrl}`, otherEntry);
    }
  }

  deleteOtherEntry(id: number) {
    return this._apiService.delete(`${this._otherEntrysUrl}/${id}`, '');
  }

  searchOtherEntrys(search) {
    return this._apiService.post(this._otherEntrysUrl + '/search', search);
  }

}
