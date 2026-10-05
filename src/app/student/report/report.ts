import { KeyValuePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-report',
  imports: [KeyValuePipe],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report {

  private api = inject(Api);

  reports = signal<any[]>([]);

  loading = signal(true);
  error = signal<string | null>(null);
  printingTermId = signal<number | null>(null);

  ngOnInit(): void {
    this.fetchMyAcademicReports();
  }

  async fetchMyAcademicReports(): Promise<void> {
    try {
      const res = await this.api.getMyResults();
      this.reports.set(res.data || []);
    } catch (err: any) {
      this.error.set(
        err?.error?.message || err?.message || 'Failed to load academic reports'
      );
    } finally {
      this.loading.set(false);
    }
  }
  
  handleDownloadTermPDF(termId: number): void {
    this.printingTermId.set(termId);
    setTimeout(() => {
      window.print();
      this.printingTermId.set(null);
    }, 100);
  }

  handleDownloadAllPDF(): void {
    this.printingTermId.set(null);
    setTimeout(() => {
      window.print();
    }, 100);
  }

}



