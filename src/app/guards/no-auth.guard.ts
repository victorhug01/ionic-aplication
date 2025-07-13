import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const { data } = await this.supabase.getClient().auth.getSession();
    const isLoggedIn = !!data.session?.user;

    if (isLoggedIn) {
      return this.router.parseUrl('/');
    } else {
      return true;
    }
  }
}
