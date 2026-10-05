import { Component, inject, signal } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-my-students',
  imports: [],
  templateUrl: './my-students.html',
  styleUrl: './my-students.css',
})
export class MyStudents {


  private api = inject(Api);

  students = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.getMyStudents()
  }


  async getMyStudents(): Promise<void> {
    try {
      this.loading.set(true);
      const res = await this.api.getMyStudents();
      this.students.set(res.data || []);
    } catch (err: any) {
      this.error.set(
        err?.error?.message || err?.message || 'Failed to load assigned students.'
      );
    } finally {
      this.loading.set(false);
    }
  }
  
  getAvatarInitial(firstName?: string): string {
    return (firstName?.[0] || 'S').toUpperCase();
  }


}
