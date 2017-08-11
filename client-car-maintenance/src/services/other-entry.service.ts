import { Injectable, Inject } from '@angular/core';
import { OtherEntry } from "../models/other-entry";
import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";


@Injectable()
export class OtherEntryService {
  private _otherEntriesUrl = '/otherEntries';
  public otherEntryTimeArray: any;
  public otherEntries: OtherEntry [];

  constructor(
    private _apiService: ApiService, private http:Http) {
  }

  getOtherEntries(): Observable<OtherEntry[]> {
    return this._apiService.get(this._otherEntriesUrl, '');
  }

  getOtherEntry(id: number) {
    return this._apiService.get(`${this._otherEntriesUrl}/${id}`, '');
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
        .put(`${this._otherEntriesUrl}/${otherEntry.id}`, updatedOtherEntry);
    }else{
      return this._apiService
        .post(`${this._otherEntriesUrl}`, otherEntry);
    }
  }

  deleteOtherEntry(id: number) {
    return this._apiService.delete(`${this._otherEntriesUrl}/${id}`, '');
  }

  searchOtherEntries(search) {
    return this._apiService.post(this._otherEntriesUrl + '/search', search);
  }

}
