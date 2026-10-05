import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  private api = inject(Api);

  activeTab = signal<'profile' | 'password'>('profile');



  // Profile Form Signals
  email = signal('');
  role = signal('');
  firstName = signal('');
  lastName = signal('');
  phoneNumber = signal('');
  bio = signal('');


  // Password Form Signals
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');


  // System State Signals
  loading = signal(true);
  submitting = signal(false);
  successMsg = signal<string | null>(null);
  errorMsg = signal<string | null>(null);


  ngOnInit(): void {
    this.fetchProfile()
  }


  async fetchProfile(): Promise<void> {
    try {
      this.loading.set(true);
      const res = await this.api.getProfile();
      const user = res.data;

      this.email.set(user.email || '');
      this.role.set(user.role || '');
      this.firstName.set(user.firstName || '');
      this.lastName.set(user.lastName || '');
      this.phoneNumber.set(user.phoneNumber || '');

      this.bio.set(user.bio || '');
    } catch (err: any) {
      this.errorMsg.set(
        err?.error?.message || err?.message || 'Failed to load user profile'
      );
    } finally {
      this.loading.set(false);
    }
  }

  setActiveTab(tab: 'profile' | 'password'): void {
    this.activeTab.set(tab);
    this.successMsg.set(null);
    this.errorMsg.set(null);
  }


  async handleProfileSubmit(): Promise<void> {
    this.successMsg.set(null);
    this.errorMsg.set(null);
    this.submitting.set(true);

    try {
      await this.api.updateProfile({
        firstName: this.firstName(),
        lastName: this.lastName(),
        phoneNumber: this.phoneNumber(),
        bio: this.bio(),
      });
      this.successMsg.set('Profile details updated successfully!');
    } catch (err: any) {
      this.errorMsg.set(
        err?.error?.message || err?.message || 'Failed to update profile'
      );
    } finally {
      this.submitting.set(false);
    }
  }


  async handlePasswordSubmit(): Promise<void> {
    this.successMsg.set(null);
    this.errorMsg.set(null);

    if (this.newPassword() !== this.confirmPassword()) {
      this.errorMsg.set('New passwords do not match.');
      return;
    }

    this.submitting.set(true);

    try {
      await this.api.changePassword({
        currentPassword: this.currentPassword(),
        newPassword: this.newPassword(),
      });
      this.successMsg.set('Password changed successfully!');
      this.currentPassword.set('');
      this.newPassword.set('');
      this.confirmPassword.set('');
    } catch (err: any) {
      this.errorMsg.set(
        err?.error?.message || err?.message || 'Failed to change password'
      );
    } finally {
      this.submitting.set(false);
    }
  }

}
