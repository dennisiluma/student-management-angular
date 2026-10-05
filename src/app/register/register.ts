import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private api = inject(Api)
  private router = inject(Router)


  firstName = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');
  loading = signal(false);

  error = signal<string | null>(null);


  async handleSubmit(): Promise<void> {
    this.loading.set(true)
    this.error.set(null);

    try {
      await this.api.register({
        firstName: this.firstName(),
        lastName: this.lastName(),
        email: this.email(),
        password: this.password(),
      })
      this.router.navigate(['/login'])

    } catch (err: any) {
      this.error.set(
        err?.error?.message || err?.message || 'Registration failed'
      );
    } finally {
      this.loading.set(false);
    }

  }
}
