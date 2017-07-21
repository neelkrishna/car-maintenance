import { Injectable, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { ToastService } from './toast.service';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ServerResponse } from '../models/server-response';


@Injectable()
export class ApiService {
  response: any;

  private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  

  constructor(private http: Http,
              public _toastService: ToastService, private app:App

  ) { }

  public baseUrl = "http://localhost:8080";

  get(url: string, params: any) {
    let getFlag = true;
    return this.http.get((this.baseUrl + url), { headers: this.headers })
      .map((response) => this.processResponse(response.json(), this))
      .catch(error => this.processError(error, this));

  }

  post(url: string, params?: any): any {
    const body = JSON.stringify(params);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options       = new RequestOptions({ headers: headers });
    return this.http
      .post((`${this.baseUrl + url}`), params, options)
      .map((response) => this.processResponse(response.json(), this))
      .catch(error => this.processError(error, this));
  
  }

  put(url: string, params: any) {
    const body = JSON.stringify(params);
    return this.http
      .put((`${this.baseUrl + url}`), body, { headers: this.headers })
      .map((response) => this.processResponse(response.json(), this))
      .catch(error => this.processError(error, this));
  }

  delete(url: string, params: any) {
    return this.http.delete((this.baseUrl + url), { headers: this.headers })
      .map((response) => this.processResponse(response.json(), this))
      .catch(error => this.processError(error, this));
  }

  processResponse(response, apiService: any) {
    //never going to happen as of Jun 9 '17 3pm
    if (response.information == null && response.payload !== null) {
      return response.payload;
    }
    else if (response.information !== null) {
      let level = response.information.level;
      let message = response.information.message;
      if (level == "I") {
        this._toastService.showInformation(message);
      }
      else if (level == "W") {
        this._toastService.showWarning(message);
      }
      else {
        this._toastService.showError(message);
      }
    }
    else {
      this._toastService.showError(response.information.message);
    }
    return response.payload;
  }

  processError(error: any, apiService?: any) {
    if (error.code == "401" || error.code == "403" || error.code == 0) {
      //this.app.getActiveNav().setRoot(LoginPage); //TODO: ask about this
    }
    else if (error.code == "500") {
      this._toastService.showError(error.information.message);
    }
    else if (JSON.parse(error._body).feedback !== null) {
      if (error.information.level == "W") {
        this._toastService.showWarning(error.information.message);
      }
      else {
        this._toastService.showError(error.information.message);
      }
    }
    else {
      this._toastService.showError(error.information.message);
    }
    return Promise.reject(error.information.message || error);
  }

}
