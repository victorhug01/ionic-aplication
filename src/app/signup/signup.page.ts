import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { LoadingService } from '../services/loading.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: String = '';
  email: String = '';
  password: String = '';
  confirmPassword: String = '';

  constructor(private router: Router, private supabaseService: SupabaseService, private loadingService: LoadingService, private toastCtrl: ToastController) { }

  ngOnInit() {}

  async signUp() {
    if (!this.email.trim() || !this.email.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.showToast('Preencha os campos.','danger');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.trim())) {
      this.showToast('Formato de email inválido.', 'danger');
      return;
    }

    if (!this.password || this.password.length < 6) {
      this.showToast('A senha deve ter pelo menos 6 caracteres.', 'danger');
      return;
    }

    if (this.password.trim() !== this.confirmPassword.trim()) {
      this.showToast('As senhas não conferem!', 'danger');
      return;
    }

    await this.loadingService.show();

    const { data, error } = await this.supabaseService.getClient().auth.signUp({
      email: this.email.trim(),
      password: this.password.trim(),
      options: {
        data: {
          name: this.name.trim(),
          full_name: this.name.trim()
        }
      }
    });

    await this.loadingService.hide();

    if (error) {
      this.showToast('Erro ao efetuar cadastro, tente novamente', 'danger');
    } else {
      this.showToast('Cadastro efetuado com sucesso!, seja bem vindo!', 'success');
      this.router.navigate(['/']);
    }

  }

  async showToast(message: string, color: String | null) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color: color?.trim() ?? 'danger',
    });
    await toast.present();
  }

}
