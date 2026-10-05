import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api, UserRole } from '../../services/api';

@Component({
  selector: 'app-custom-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './custom-register.html',
  styleUrl: './custom-register.css',
})
export class CustomRegister {

  private api = inject(Api);
  private router = inject(Router);

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');
  role = signal<UserRole>('student');
  loading = signal(false);
  error = signal<string | null>(null);

  async handleSubmit(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      await this.api.register({
        firstName: this.firstName(),
        lastName: this.lastName(),
        email: this.email(),
        password: this.password(),
        role: this.role(),
      });
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error.set(
        err?.error?.message || err?.message || 'Registration failed'
      );
    } finally {
      this.loading.set(false);
    }
  }
}
