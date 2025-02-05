import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastOkService {
  constructor(private toastController: ToastController) {}

  async presentToast(message: string, duration: number, scss: string = 'ok') {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      cssClass: scss
    });
    await toast.present();
  }
}
