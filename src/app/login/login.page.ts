import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { LoadingService } from '../services/loading.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';

  constructor(private router: Router, private supabaseService: SupabaseService, private loadingService: LoadingService) { }

  ngOnInit() {}

  async login() {

    await this.loadingService.show();

    const { data, error } = await this.supabaseService.getClient().auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    await this.loadingService.hide();

    if (error) {
      alert('Erro: ' + error.message);
    } else {
      this.router.navigate(['/']);
    }
  }

}
