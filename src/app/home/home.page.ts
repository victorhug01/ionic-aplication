import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  name: String = '';


  constructor(private router: Router, private supabaseService: SupabaseService, private loadingService: LoadingService, private toastCtrl: ToastController) {}

  async ngOnInit() {
    await this.getnameConnetedUser()
  }

  async signOut() {
    await this.loadingService.show();

    const { error } = await this.supabaseService.getClient().auth.signOut({});

    await this.loadingService.hide();

    if (error) {
      this.showToast('Erro ao sair, tente novamente.');
    } else {
      this.router.navigate(['/login']);
    }
  }

  async getnameConnetedUser() {
    const { data: { user }, error } = await this.supabaseService.getClient().auth.getUser();

    if (user) {
      this.name = user.user_metadata?.['full_name'];
    } else {
      this.name = 'bem-vindo(a)';
    }
  }

  navigateProducts() {
    this.router.navigate(['/products']);
  }

  navigateOrdens() {
    this.router.navigate(['/ordens'])
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
