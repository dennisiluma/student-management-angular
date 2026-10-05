import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private api = inject(Api)

  get isAuthenticated(): boolean {
    return this.api.isAuthenticated();
  }

  get isTeacher(): boolean {
    return this.api.isTeacher();
  }

  get isAdmin(): boolean {
    return this.api.isAdmin();
  }

  get dashboardUrl(): string {
    if (this.isAdmin) return '/admin/dashboard';
    if (this.isTeacher) return '/teacher/dashboard';
    return '/student/dashboard';
  }

}
