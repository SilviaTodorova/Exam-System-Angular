import { Component, OnInit } from '@angular/core';
import { Exam, Question, Answer } from '../../models/exam/exam';
import { Title } from '@angular/platform-browser';

import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

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

  constructor(private modalService: NgbModal,
    private studentsService: StudentsService,
    private router: Router) { }


  ngOnInit() {
    this.orderId = 1;
  }

  finishExam() {
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
    let checkAnswered: boolean = this.exam.questions.filter(x => x.orderId == orderId)[0].answers.some(x => x.correct == true);
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
  startExam() {
    this.studentsService.getTest(this.examCode).subscribe(data => {
      if (data && data.questions && data.questions.length > 0) {
        this.isExamStarted = true;
        let orderId = 1;
        this.exam = data;
        this.exam.questions.map(x => x.orderId = orderId++);
      } else {
        alert("Empty test");
      }
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server error");
      }
    });
  }

}