import { Component, OnInit } from '@angular/core';
import { ExamResults } from 'src/app/models/results/exam-results';

@Component({
  selector: 'app-ngbd-rating',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit{
  exams: ExamResults[] = [];

  ngOnInit(){
    let e1: ExamResults = new ExamResults();
    e1.countQuestions = 10;
    e1.average = 5.5;
    e1.title = "XML технологии за семантичен Уеб";
    let e2: ExamResults = new ExamResults();
    e2.countQuestions = 50;
    e2.average = 5.5;
    e2.title = "Анализ на софтуерните изисквания";
    let e3: ExamResults = new ExamResults();
    e3.countQuestions = 30;
    e3.average = 4.5;
    e3.title = "Увод в софтуерното инженерство";
    let e4: ExamResults = new ExamResults();
    e4.countQuestions = 15;
    e4.average = 2.5;
    e4.title = "Софтуерни архитектури и разработка на софтуер";
    this.exams = [e1,e2,e3,e4];
  }
}
