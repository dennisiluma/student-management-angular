import { Routes } from '@angular/router';
import { Home } from './home/home';
import { apiGuardGuard } from './guard/api-guard-guard';

export const routes: Routes = [

    // {
    //     path: '',
    //     component: Home
    // },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'

    },

    {
        path: '',
        loadComponent: () => import('./home/home').then((m) => m.Home),
    },

    {
        path: 'register',
        loadComponent: () => import('./register/register').then((m) => m.Register),
    },

    {
        path: 'login',
        loadComponent: () => import('./login/login').then((m) => m.Login),
    },

    {
        path: 'about',
        loadComponent: () => import('./about/about').then((m) => m.About),
    },

    {
        path: 'timetable',
        loadComponent: () => import('./timetable/timetable').then((m) => m.Timetable),
    },




    {
        path: 'profile',
        canActivate: [apiGuardGuard],
        loadComponent: () => import('./profile/profile').then((m) => m.Profile),
    },


    {
        path: 'student',
        canActivate: [apiGuardGuard],
        data: { allowedRoles: ['student'] },
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./student/dashboard/dashboard').then((m) => m.Dashboard)

            },
            {
                path: 'reports',
                loadComponent: () => import('./student/report/report').then((m) => m.Report)

            },
            {
                path: 'classmates',
                loadComponent: () => import('./student/classmate/classmate').then((m) => m.Classmate)

            },
        ]
    },


    {
        path: 'teacher',
        canActivate: [apiGuardGuard],
        data: { allowedRoles: ['teacher'] },
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./teacher/dashboard/dashboard').then((m) => m.Dashboard)

            },
            {
                path: 'my-students',
                loadComponent: () => import('./teacher/my-students/my-students').then((m) => m.MyStudents)

            },
            {
                path: 'create-reports',
                loadComponent: () => import('./teacher/create-reports/create-reports').then((m) => m.CreateReports)

            },
        ]
    },




    {
        path: 'admin',
        canActivate: [apiGuardGuard],
        data: { allowedRoles: ['admin'] },
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./admin/dashboard/dashboard').then((m) => m.Dashboard)

            },
            {
                path: 'register',
                loadComponent: () => import('./admin/custom-register/custom-register').then((m) => m.CustomRegister)

            },
            {
                path: 'classroom',
                loadComponent: () => import('./admin/classroom/classroom').then((m) => m.Classroom)

            },
            {
                path: 'management',
                loadComponent: () => import('./admin/management/management').then((m) => m.Management)

            },
        ]
    },

    {
        path: '**',
        redirectTo: ''
    }

];
