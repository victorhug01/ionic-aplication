import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class OrdemService {
  constructor(private supabase: SupabaseService) {}

  async cadastrar(ordem: any) {
    const user = (await this.supabase.getClient().auth.getUser()).data.user;

    return this.supabase.getClient().from('ordens_servico').insert({
      ...ordem,
      user_id: user?.id,
    });
  }

  async listar() {
    return this.supabase.getClient()
      .from('ordens_servico')
      .select('*, produtos(nome)')
      .order('created_at', { ascending: false });
  }

  async atualizar(id: string, campos: any) {
    return this.supabase.getClient()
      .from('ordens_servico')
      .update(campos)
      .eq('id', id);
  }
}
