import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { TeacherExamComponent } from './teacher-exams/teacher-exam.component';
import { ResultsComponent } from './results/results.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { PreviewExamComponent } from './preview-exam/preview-exam.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    TeacherExamComponent,
    ResultsComponent,
    AddExamComponent,
    EditExamComponent,
    PreviewExamComponent
  ]
})
export class ComponentsModule {
}
