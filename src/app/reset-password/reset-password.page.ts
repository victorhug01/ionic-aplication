import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { LoadingService } from '../services/loading.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  password: String = '';
  confirmPassword: String = '';
  nav = this.router.getCurrentNavigation();
  email = this.nav?.extras?.state?.['email'];


  constructor(private router: Router, private supabaseService: SupabaseService, private loadingService: LoadingService, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async resetPassword() {

    if(this.password == '' || this.confirmPassword == ''){
      this.showToast('Campo em branco.', 'danger');
    }else if(this.password != this.confirmPassword){
      this.showToast('Senhas diferentes!', 'danger');
    }else{
      await this.loadingService.show();

      const { data, error } = await this.supabaseService.getClient().auth.updateUser({
        email: this.email,
        password: this.password.trim(),
      });

      await this.loadingService.hide();

      if (error) {
        this.showToast('A senha não pode ser igual a anterior', 'danger');
        this.password = '';
        this.confirmPassword = ''
      } else {
        this.showToast('Senha alterada com sucesso!', 'success');
        this.password = '';
        this.confirmPassword = ''
        this.router.navigate(['/']);
      }
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
