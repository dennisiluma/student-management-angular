import { Component, inject, signal } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-classmate',
  imports: [],
  templateUrl: './classmate.html',
  styleUrl: './classmate.css',
})
export class Classmate {


  private api = inject(Api);

  classmates = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.fetchMyClassmates();
  }

  async fetchMyClassmates(): Promise<void> {
    try {
      const res = await this.api.getMyClassmates();
      this.classmates.set(res.data || []);
    } catch (err: any) {
      this.error.set(
        err?.error?.message || err?.message || 'Failed to load classmates'
      );
    } finally {
      this.loading.set(false);
    }
  }


  getInitials(first?: string, last?: string): string {
    return `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase() || 'ST';
  }

}
