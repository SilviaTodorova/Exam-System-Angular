import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ExamComponent } from './component/exam/exam.component';

export const Approutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'exam',
    component: ExamComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: './component/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashoboard'
  }
];