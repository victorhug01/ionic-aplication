import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { LoadingService } from '../services/loading.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email = '';

  constructor(private router: Router, private supabaseService: SupabaseService, private loadingService: LoadingService, private toastCtrl: ToastController) { }

  ngOnInit() {}

  async sendCode() {

    if (!this.email.trim()) {
      this.showToast('Preencha o e-mail.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.showToast('E-mail inválido.');
      return;
    }

    await this.loadingService.show();

    const { data, error } = await this.supabaseService.getClient().auth.resetPasswordForEmail(
      this.email.trim()
    );

    if (error) {
      this.showToast('Email inválido!');
    } else {
      this.router.navigate(['/verify-code'], {state: { email: this.email.trim() }})
    }

    await this.loadingService.hide();

  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }

}
