import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, tap, throwError } from 'rxjs';

export type UserRole = 'teacher' | 'student' | 'admin';




// ==========================================
// AUTH INTERCEPTOR FUNCTION
// ==========================================
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};


@Injectable({
  providedIn: 'root',
})
export class Api {

  private http = inject(HttpClient)
  private router = inject(Router)
  private baseUrl = 'http://localhost:8083/api'


  // Role & Auth Helper Methods
  getUserRole(): string | null {
    return localStorage.getItem('user_role')?.toLowerCase() || null;
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('access_token'));
  }

  isStudent(): boolean {
    return this.isAuthenticated() && this.getUserRole() === 'student';
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.getUserRole() === 'admin';
  }

  isTeacher(): boolean {
    return this.isAuthenticated() && this.getUserRole() === 'teacher';
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    this.router.navigate(['/login']);
  }


  login(credentials: any): Promise<any> {
    return firstValueFrom(
      this.http.post<any>(`${this.baseUrl}/auth/login`, credentials).pipe(
        tap((res) => {
          if (res?.data?.token) {
            localStorage.setItem('access_token', res.data.token);
          }
          if (res?.data?.role) {
            localStorage.setItem('user_role', res.data.role);
          }
        })
      )
    );
  }


  register(data: any): Promise<any> {
    return firstValueFrom(
      this.http.post(`${this.baseUrl}/auth/register`, data)
    );
  }

  getProfile(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/users/me`));
  }

  updateProfile(data: any): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/users/me`, data));
  }

  changePassword(data: { currentPassword: any; newPassword: any }): Promise<any> {
    return firstValueFrom(
      this.http.put(`${this.baseUrl}/users/change-password`, data)
    );
  }

  getMyResults(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/results/me`));
  }

  getMyClassmates(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/classrooms/my-classmates`)
    );
  }




  
  // Teachers & Admin Methods
  getMyStudents(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/classrooms/my-students`)
    );
  }

  createAcademicResult(data: {
    studentId: number;
    term: string;
    academicYear: string;
    grades: Record<string, string>;
  }): Promise<any> {
    return firstValueFrom(
      this.http.post(`${this.baseUrl}/results/create`, data)
    );
  }

  getAllUsersByRole(role?: any): Promise<any> {
    let params = new HttpParams();
    if (role) {
      params = params.set('role', role);
    }
    return firstValueFrom(this.http.get(`${this.baseUrl}/users`, { params }));
  }

  getAllClassrooms(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.baseUrl}/classrooms`));
  }

  // Admin Only Methods
  assignTeacherToClassroom(data: {
    classroomId: number;
    teacherId: number;
  }): Promise<any> {
    return firstValueFrom(
      this.http.post(`${this.baseUrl}/classrooms/assign-teacher`, data)
    );
  }

  assignStudentToClassroom(data: {
    classroomId: number;
    userId: number;
  }): Promise<any> {
    return firstValueFrom(
      this.http.post(`${this.baseUrl}/classrooms/assign-student`, data)
    );
  }

  createClassroom(data: { name: string }): Promise<any> {
    return firstValueFrom(this.http.post(`${this.baseUrl}/classrooms`, data));
  }

  updateClassroom(data: { id: number; name: string }): Promise<any> {
    return firstValueFrom(this.http.put(`${this.baseUrl}/classrooms`, data));
  }
}