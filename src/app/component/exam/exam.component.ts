import { Component, OnInit } from '@angular/core';
import { Exam, Question, Answer } from '../../models/exam/exam';
import { Title } from '@angular/platform-browser';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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

  constructor(private modalService: NgbModal,private router: Router) { }


  ngOnInit() {
    this.orderId = 1;
    this.loadExam();
  }

  startExam() {
    this.isExamStarted = true;
  }

  finishExam() {
    console.log(this.exam);
    this.router.navigate(['/']);
  }

  nextQuestion() {
    this.orderId = (this.orderId < this.exam.countQuestions) ? this.orderId + 1 : this.orderId;
  }

  previousQuestion() {
    this.orderId = (this.orderId > 1) ? this.orderId - 1 : this.orderId;
  }

  selectAnswer(id: number) {
    this.exam.questions[this.orderId - 1].answers.forEach(x => {
      if (x.id == id) {
        x.correct = true;
      } else {
        x.correct = false;
      }
    })
  }

  calculateClasses(orderId: number) {
    let checkAnswered: boolean = this.exam.questions.filter(x=>x.orderId == orderId)[0].answers.some(x=>x.correct == true);
    return {
      'btn-secondary': checkAnswered,
      'btn-outline-secondary': !checkAnswered,
      'btn': true
    };
  }

  loadQuestion(orderId: number) {
    this.orderId = orderId;
  }

  openModal(content3) {
    this.modalService.open(content3, { centered: true });
  }

  //Service
  loadExam() {
    this.exam = {
      id: 1,
      title: "XML технологии за семантичен Уеб",
      countQuestions: 2,
      timeLimit: 10,
      questions: [
        {
          id: 1,
          orderId: 1,
          title: "Параметричните единици (Parameter Entities) са декларирани в DTD и се използват:",
          answers: [
            {
              orderId: 1,
              id: 1,
              title: "единствено в декларациите на DTD",
              correct: false
            },
            {
              orderId: 2,
              id: 2,
              title: " в декларациите на DTD",
              correct: false
            },
            {
              orderId: 3,
              id: 3,
              title: "единствено в  на DTD",
              correct: false
            }
          ]
        },
        {
          id: 2,
          orderId: 2,
          title: "(Parameter Entities) са декларирани в DTD и се използват:",
          answers: [
            {
              orderId: 1,
              id: 1,
              title: " DTD",
              correct: false
            },
            {
              orderId: 1,
              id: 2,
              title: " в декларTD",
              correct: false
            },
            {
              orderId: 2,
              id: 3,
              title: "222222222DTD",
              correct: false
            }
          ]
        }
      ]
    };

    console.log(this.exam);
  }

}