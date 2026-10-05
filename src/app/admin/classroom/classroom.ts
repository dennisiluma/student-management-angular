import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';


interface ClassroomModel {
  id: number;
  name: string;
  teacherId?: number | null;
}

@Component({
  selector: 'app-classroom',
  imports: [FormsModule],
  templateUrl: './classroom.html',
  styleUrl: './classroom.css',
})
export class Classroom {


  private api = inject(Api);

  classrooms = signal<ClassroomModel[]>([]);
  loading = signal(true);
  submitting = signal(false);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states
  isEditing = signal(false);
  editingId = signal<number | null>(null);
  classroomName = signal('');



  ngOnInit(): void {
    this.fetchClassrooms();
  }


  async fetchClassrooms(): Promise<void> {
    try {
      this.loading.set(true);
      const res = await this.api.getAllClassrooms();
      this.classrooms.set(res.data || []);
    } catch (err: any) {
      this.message.set({
        type: 'error',
        text: 'Failed to fetch classrooms list.',
      });
    } finally {
      this.loading.set(false);
    }
  }

  resetForm(): void {
    this.classroomName.set('');
    this.editingId.set(null);
    this.isEditing.set(false);
  }


  handleEditClick(cls: ClassroomModel): void {
    this.isEditing.set(true);
    this.editingId.set(cls.id);
    this.classroomName.set(cls.name);
    this.message.set(null);
  }


  async handleSubmit(): Promise<void> {
    if (!this.classroomName().trim()) return;

    this.submitting.set(true);
    this.message.set(null);

    try {
      const name = this.classroomName().trim();
      const currentEditingId = this.editingId();

      if (this.isEditing() && currentEditingId) {
        await this.api.updateClassroom({ id: currentEditingId, name });
        this.message.set({
          type: 'success',
          text: 'Classroom updated successfully!',
        });
      } else {
        await this.api.createClassroom({ name });
        this.message.set({
          type: 'success',
          text: 'Classroom created successfully!',
        });
      }
      this.resetForm();
      await this.fetchClassrooms();
    } catch (err: any) {
      this.message.set({
        type: 'error',
        text:
          err?.error?.message ||
          err?.message ||
          'Failed to save classroom.',
      });
    } finally {
      this.submitting.set(false);
    }
  }

}
