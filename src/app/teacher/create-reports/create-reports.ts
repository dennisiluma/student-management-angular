import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';



interface GradeEntry {
  subject: string;
  grade: string;
}

@Component({
  selector: 'app-create-reports',
  imports: [FormsModule],
  templateUrl: './create-reports.html',
  styleUrl: './create-reports.css',
})
export class CreateReports {

  private api = inject(Api)

  students = signal<any[]>([]);

  selectedStudentId = signal<number | ''>('');

  term = signal('1st Term');
  academicYear = signal('2026');

  gradeEntries = signal<GradeEntry[]>([
    { subject: 'Mathematics', grade: 'A' },
    { subject: 'English', grade: 'B+' },
  ]);


  loading = signal(true);
  submitting = signal(false);
  message = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  gradeOptions = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'];


  ngOnInit(): void {
    this.loadMyStudents();
  }

  async loadMyStudents(): Promise<void> {
    try {
      const res = await this.api.getMyStudents();
      const list = res.data || [];
      this.students.set(list);
      if (list.length > 0) {
        this.selectedStudentId.set(list[0].id);
      }
    } catch (err: any) {
      this.message.set({
        type: 'error',
        text: 'Failed to load classroom students.',
      });
    } finally {
      this.loading.set(false);
    }
  }

  addGradeRow(): void {
    this.gradeEntries.update((entries) => [
      ...entries,
      { subject: '', grade: 'A' },
    ]);
  }
  removeGradeRow(index: number): void {
    this.gradeEntries.update((entries) => entries.filter((_, i) => i !== index));
  }


  async handleSubmit(): Promise<void> {
    if (!this.selectedStudentId()) {
      this.message.set({ type: 'error', text: 'Please select a student.' });
      return;
    }

    const gradesMap: Record<string, string> = {};
    for (const item of this.gradeEntries()) {
      if (item.subject.trim()) {
        gradesMap[item.subject.trim()] = item.grade;
      }
    }

    this.submitting.set(true);
    this.message.set(null);

    try {
      await this.api.createAcademicResult({
        studentId: Number(this.selectedStudentId()),
        term: this.term(),
        academicYear: this.academicYear(),
        grades: gradesMap,
      });
      this.message.set({
        type: 'success',
        text: 'Report card generated successfully!',
      });
    } catch (err: any) {
      this.message.set({
        type: 'error',
        text:
          err?.error?.message ||
          err?.message ||
          'Failed to create academic report.',
      });
    } finally {
      this.submitting.set(false);
    }
  }
}
