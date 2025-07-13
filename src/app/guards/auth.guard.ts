import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private supabase: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const { data } = await this.supabase.getClient().auth.getSession();
    const isAuthenticated = !!data.session?.user;

    if (isAuthenticated) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
