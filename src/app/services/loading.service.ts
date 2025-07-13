// src/app/services/loading.service.ts
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private loadingCtrl: LoadingController) {}

  async show() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
      cssClass: 'no-box-loading',
    });
    await this.loading.present();
  }

  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
