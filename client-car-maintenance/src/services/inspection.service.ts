import { Injectable, Inject } from '@angular/core';
import { Inspection } from "../models/inspection";
import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs/observable";


@Injectable()
export class InspectionService {
  private _inspectionsUrl = '/inspections';
  public inspectionTimeArray: any;
  public inspections: Inspection [];

  constructor(
    private _apiService: ApiService, private http:Http) {
  }

  getInspections(): Observable<Inspection[]> {
    return this._apiService.get(this._inspectionsUrl, '');
  }

  getInspection(id: number) {
    return this._apiService.get(`${this._inspectionsUrl}/${id}`, '');
  }

  createOrUpdateInspection(inspection: Inspection) {
    if(inspection.id){
      let updatedInspection: Inspection;
      updatedInspection = new Inspection;
      updatedInspection.id = inspection.id;
      updatedInspection.date = inspection.date;
      updatedInspection.mileage = inspection.mileage;
      updatedInspection.dateNextDue = inspection.dateNextDue;
      updatedInspection.cost = inspection.cost;
      updatedInspection.notes = inspection.notes;
      return this._apiService
        .put(`${this._inspectionsUrl}/${inspection.id}`, updatedInspection);
    }else{
      return this._apiService
        .post(`${this._inspectionsUrl}`, inspection);
    }
  }

  deleteInspection(id: number) {
    return this._apiService.delete(`${this._inspectionsUrl}/${id}`, '');
  }

  searchInspections(search) {
    return this._apiService.post(this._inspectionsUrl + '/search', search);
  }

}
