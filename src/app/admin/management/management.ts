import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-management',
  imports: [FormsModule],
  templateUrl: './management.html',
  styleUrl: './management.css',
})
export class Management {

  private api = inject(Api);

  activeTab = signal<'teacher' | 'student'>('teacher');
  classrooms = signal<any[]>([]);
  teachers = signal<any[]>([]);
  students = signal<any[]>([]);

  // Selection states
  selectedClassroom = signal<number | ''>('');
  selectedTeacher = signal<number | ''>('');
  selectedStudent = signal<number | ''>('');

  loading = signal(true);
  submitting = signal(false);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);


  ngOnInit(): void {
    this.loadAdminData();
  }

  async loadAdminData(): Promise<void> {
    try {
      this.loading.set(true);
      const [classRes, teacherRes, studentRes] = await Promise.all([
        this.api.getAllClassrooms(),
        this.api.getAllUsersByRole('teacher'),
        this.api.getAllUsersByRole('student'),
      ]);

      const classData = classRes.data || [];
      const teacherData = teacherRes.data || [];
      const studentData = studentRes.data || [];

      this.classrooms.set(classData);
      this.teachers.set(teacherData);
      this.students.set(studentData);

      if (classData.length > 0) this.selectedClassroom.set(classData[0].id);
      if (teacherData.length > 0) this.selectedTeacher.set(teacherData[0].id);
      if (studentData.length > 0) this.selectedStudent.set(studentData[0].id);
    } catch (err: any) {
      this.message.set({
        type: 'error',
        text: 'Failed to load administrative resources.',
      });
    } finally {
      this.loading.set(false);
    }
  }

  switchTab(tab: 'teacher' | 'student'): void {
    this.activeTab.set(tab);
    this.message.set(null);
  }


  async handleAssignTeacher(): Promise<void> {
    if (!this.selectedClassroom() || !this.selectedTeacher()) return;

    this.submitting.set(true);
    this.message.set(null);

    try {
      await this.api.assignTeacherToClassroom({
        classroomId: Number(this.selectedClassroom()),
        teacherId: Number(this.selectedTeacher()),
      });
      this.message.set({
        type: 'success',
        text: 'Teacher assigned to classroom successfully. Unassigned from prior classrooms.',
      });
    } catch (err: any) {
      this.message.set({
        type: 'error',
        text:
          err?.error?.message ||
          err?.message ||
          'Failed to assign teacher.',
      });
    } finally {
      this.submitting.set(false);
    }
  }


  async handleAssignStudent(): Promise<void> {
    if (!this.selectedClassroom() || !this.selectedStudent()) return;

    this.submitting.set(true);
    this.message.set(null);

    try {
      await this.api.assignStudentToClassroom({
        classroomId: Number(this.selectedClassroom()),
        userId: Number(this.selectedStudent()),
      });
      this.message.set({
        type: 'success',
        text: 'Student enrolled into classroom successfully.',
      });
    } catch (err: any) {
      this.message.set({
        type: 'error',
        text:
          err?.error?.message ||
          err?.message ||
          'Failed to assign student.',
      });
    } finally {
      this.submitting.set(false);
    }
  }
}
