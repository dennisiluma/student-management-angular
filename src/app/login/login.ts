import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private api = inject(Api);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal<string | null>(null);



  async handleSubmit(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const res = await this.api.login({
        email: this.email(),
        password: this.password(),
      });

      this.router.navigate(['/']);
    } catch (err: any) {
      this.error.set(
        err?.error?.message || err?.message || 'Invalid credentials provided'
      );
    } finally {
      this.loading.set(false);
    }
  }

}
