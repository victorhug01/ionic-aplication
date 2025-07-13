import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { LoadingService } from '../services/loading.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private loadingService: LoadingService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async login() {
    if (!this.email.trim()) {
      this.showToast('Preencha o e-mail.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showToast('E-mail inválido.');
      return;
    }

    if (!this.password || this.password.length < 6) {
      this.showToast('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    await this.loadingService.show();

    const { data, error } = await this.supabaseService.getClient().auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    await this.loadingService.hide();

    if (error) {
      this.showToast('Email ou senha inválidos!');
      this.password = '';
    } else {
      this.email = '';
      this.password = '';
      this.router.navigate(['/']);
    }
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
