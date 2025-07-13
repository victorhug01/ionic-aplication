// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://jyhkrtydhrepdayjbdbt.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5aGtydHlkaHJlcGRheWpiZGJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjM1NDkyMSwiZXhwIjoyMDY3OTMwOTIxfQ.6_qXIQl9CXIwLAt4knFio3cNh2k6-cEGQ_9F0rwwcKc'
    );
  }

  getClient() {
    return this.supabase;
  }
}
