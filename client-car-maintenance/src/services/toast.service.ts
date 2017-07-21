/**
 * Created by neelkrishna on 6/9/17.
 */
import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";



@Injectable()
export class ToastService {

  constructor(
    private _toastController: ToastController) {
  }

  private informationOptions = {

  };
  private warningOptions = {
    showCloseButton: true,
    duration: 10000
  };
  private errorOptions = {
    showCloseButton: true,
    duration: 10000
  };


  showInformation(message) {
    this.presentToast(this.informationOptions, message);
  }
  showWarning(message) {
    this.presentToast(this.warningOptions, message);
  }
  showError(message) {
    this.presentToast(this.errorOptions, message);
  }

  presentToast(options, message) {
    let finalOptions = {
      message: message,
      duration: options.duration ? options.duration: 3000,
      position: options.position? options.position : 'bottom'
    };

    let toast = this._toastController.create(finalOptions);

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }



}
