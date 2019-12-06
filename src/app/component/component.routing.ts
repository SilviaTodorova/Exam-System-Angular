import { Routes } from '@angular/router';

import { TeacherExamComponent } from './teacher-exams/teacher-exam.component';
import { ResultsComponent } from './results/results.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { PreviewExamComponent } from './preview-exam/preview-exam.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'teacher-exam',
        component: TeacherExamComponent,
        data: {
          title: 'Налични тестове'
        }
      },
      {
        path: 'results',
        component: ResultsComponent,
        data: {
          title: 'Резултати',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Резултати' }
          ]
        }
      },
      {
        path: 'add-exam',
        component: AddExamComponent,
        data: {
          title: 'Добави тест',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Резултати' }
          ]
        }
      },
      {
        path: 'edit-exam',
        component: EditExamComponent,
        data: {
          title: 'Редактирай тест',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Редактирай изпит' }
          ]
        }
      },
      {
        path: 'preview-exam',
        component: PreviewExamComponent,
        data: {
          title: 'Преглед тест',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Редактирай изпит' }
          ]
        }
      }
    ]
  }
];