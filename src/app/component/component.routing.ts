import { Routes } from '@angular/router';

import { NgbdpregressbarBasicComponent } from './progressbar/progressbar.component';
import { NgbdratingBasicComponent } from './rating/rating.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { PreviewExamComponent } from './preview-exam/preview-exam.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'progressbar',
        component: NgbdpregressbarBasicComponent,
        data: {
          title: 'Налични тестове'
        }
      },
      {
        path: 'rating',
        component: NgbdratingBasicComponent,
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