import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { LoadingService } from '../services/loading.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
})
export class VerifyCodePage implements OnInit {
  code: string = '';
  nav = this.router.getCurrentNavigation();
  email = this.nav?.extras?.state?.['email'];

  constructor(private router: Router, private supabaseService: SupabaseService, private loadingService: LoadingService, private toastCtrl: ToastController) {}

  ngOnInit() {}

  moveToNext(event: Event) {
    const el = event.target as HTMLInputElement;

    if (el.value.length === el.maxLength) {
      const next = el.nextElementSibling as HTMLElement | null;
      if (next && next.tagName === 'INPUT') {
        (next as HTMLInputElement).focus();
      }
    }

    if ((event as InputEvent).inputType === 'deleteContentBackward') {
      const prev = el.previousElementSibling as HTMLElement | null;
      if (prev && prev.tagName === 'INPUT') {
        (prev as HTMLInputElement).focus();
      }
    }
  }

  async verificar() {
    const inputs = document.querySelectorAll('input[name="pin"]');
    const valores: string[] = [];

    inputs.forEach((input: any) => {
      valores.push(input.value);
    });

    this.code = valores.join('');

    if(this.code.length != 6){
      this.showToast('Preencha todos os campos.');
    }else{
      await this.loadingService.show();

      const { data, error } = await this.supabaseService.getClient().auth.verifyOtp({
        email: this.email,
        token: this.code,
        type: 'recovery'
      });

      await this.loadingService.hide();

      if (error) {
        this.showToast('Código inválido, tente novamente');
      } else {
        this.router.navigate(['/reset-password'], {state: { email: this.email.trim() }})
      }
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
