import { Component, OnInit } from '@angular/core';
import { ExamRating } from 'src/app/models/rating/exam-rating';

@Component({
  selector: 'app-ngbd-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class NgbdratingBasicComponent implements OnInit{
  exams: ExamRating[] = [];

  ngOnInit(){
    let e1: ExamRating = new ExamRating();
    e1.countQuestions = 10;
    e1.average = 5.5;
    e1.title = "XML технологии за семантичен Уеб";
    let e2: ExamRating = new ExamRating();
    e2.countQuestions = 50;
    e2.average = 5.5;
    e2.title = "Анализ на софтуерните изисквания";
    let e3: ExamRating = new ExamRating();
    e3.countQuestions = 30;
    e3.average = 4.5;
    e3.title = "Увод в софтуерното инженерство";
    let e4: ExamRating = new ExamRating();
    e4.countQuestions = 15;
    e4.average = 2.5;
    e4.title = "Софтуерни архитектури и разработка на софтуер";
    this.exams = [e1,e2,e3,e4];
  }
}
