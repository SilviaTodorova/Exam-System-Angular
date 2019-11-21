import { Component } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam/exam';

@Component({
  selector: 'app-ngbd-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css'],
  providers: [NgbProgressbarConfig]
})
export class NgbdpregressbarBasicComponent {
  examList: Array<Exam> = [
      { intId: 1, title: 'XML технологии за семантичен Уеб', countQuestions: 30, timeLimit: 20, questions: null},
      { intId: 2, title: 'Увод в софтуерното инженерство', countQuestions: 45, timeLimit: 20, questions: null},
      { intId: 3, title: 'Анализ на софтуерните изисквания', countQuestions: 26, timeLimit: 20, questions: null},
      { intId: 4, title: 'Софтуерни архитектури и разработка на софтуер', countQuestions: 26, timeLimit: 20, questions: null},
      { intId: 5, title: 'Управление на качеството', countQuestions: 31, timeLimit: 20, questions: null},
    ];

  constructor(private router: Router) { }

  addExam(){
    this.router.navigate(['/component/add-exam']);
  }

  editExam(id: number){
    this.router.navigate(['/component/edit-exam'], { queryParams: {id: id}});
  }

  deleteExam(id: number){
    console.log("Modal");
  }
}
