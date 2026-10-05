import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private api = inject(Api)

  get isAuthenticated(): boolean {
    return this.api.isAuthenticated()
  }

  get isTeacher(): boolean {
    return this.api.isTeacher();
  }

  get isStudent(): boolean {
    return this.api.isStudent();
  }

  get isAdmin(): boolean {
    return this.api.isAdmin();
  }

  get role(): string | null {
    return this.api.getUserRole();
  }

  handleLogout(): void {
    this.api.logout()
  }


}
