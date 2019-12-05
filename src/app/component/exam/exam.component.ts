import { Component, OnInit } from '@angular/core';
import { Exam, Question, Answer } from '../../models/exam/exam';
import { Title } from '@angular/platform-browser';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export class ExamComponent implements OnInit {
  isExamStarted: boolean;
  examCode: string;
  exam: Exam;
  orderId: number;

  constructor() { }


  ngOnInit() {
    this.orderId = 1;
    this.loadExam();
  }

  startExam() {
    this.isExamStarted = true;
  }

  finishExam() {
    console.log(this.exam);
  }

  nextQuestion() {
    this.orderId = (this.orderId < this.exam.countQuestions) ? this.orderId + 1 : this.orderId;
  }

  previousQuestion() {
    this.orderId = (this.orderId > 1) ? this.orderId - 1 : this.orderId;
  }

  selectAnswer(intId: number) {
    this.exam.questions[this.orderId - 1].answers.forEach(x => {
      if (x.intId == intId) {
        x.selected = true;
      } else {
        x.selected = false;
      }
    })
  }

  calculateClasses(orderId: number) {
    let checkAnswered: boolean = this.exam.questions.filter(x=>x.orderId == orderId)[0].answers.some(x=>x.selected == true);
    return {
      'btn-secondary': checkAnswered,
      'btn-outline-secondary': !checkAnswered,
      'btn': true
    };
  }

  loadQuestion(orderId: number) {
    this.orderId = orderId;
  }

  //Service
  loadExam() {
    this.exam = {
      intId: 1,
      title: "XML технологии за семантичен Уеб",
      countQuestions: 2,
      timeLimit: 10,
      questions: [
        {
          intId: 1,
          orderId: 1,
          title: "Параметричните единици (Parameter Entities) са декларирани в DTD и се използват:",
          answers: [
            {
              intId: 1,
              title: "единствено в декларациите на DTD",
              selected: false
            },
            {
              intId: 2,
              title: " в декларациите на DTD",
              selected: false
            },
            {
              intId: 3,
              title: "единствено в  на DTD",
              selected: false
            }
          ]
        },
        {
          intId: 2,
          orderId: 2,
          title: "(Parameter Entities) са декларирани в DTD и се използват:",
          answers: [
            {
              intId: 1,
              title: " DTD",
              selected: false
            },
            {
              intId: 2,
              title: " в декларTD",
              selected: false
            },
            {
              intId: 3,
              title: "222222222DTD",
              selected: false
            }
          ]
        }
      ]
    };

    console.log(this.exam);
  }

}