import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  constructor(private supabase: SupabaseService) {}

  async cadastrar(produto: any) {
    const user = (await this.supabase.getClient().auth.getUser()).data.user;

    return this.supabase.getClient().from('produtos').insert({
      ...produto,
      user_id: user?.id,
    });
  }

  async listar() {
    return this.supabase.getClient()
      .from('produtos')
      .select('*')
      .order('created_at', { ascending: false });
  }
}
