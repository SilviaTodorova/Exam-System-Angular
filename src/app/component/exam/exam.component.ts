import { Component, OnInit } from '@angular/core';
import { Exam } from '../../models/exam/exam';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  timeLeft: number = 0;
  interval;
  hours: number;
  minutes: number;
  seconds: number;
  content: any;

  constructor(private modalService: NgbModal,
    private studentsService: StudentsService,
    private router: Router) { }


  ngOnInit() {
    this.orderId = 1;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.modalService.open(this.content, { centered: true });
        clearInterval(this.interval);
      }
      this.timeConvert(this.timeLeft);
    }, 1000)
  }

  timeConvert(totalSeconds) {
    this.hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    this.minutes = Math.floor(totalSeconds / 60);
    this.seconds = totalSeconds % 60;
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

  openModal(content) {
    this.modalService.open(content, { centered: true });
  }

  //Service
  startExam(content) {
    this.content = content;

    this.studentsService.getTest(this.examCode).subscribe(data => {
      if (data && data.questions && data.questions.length > 0) {
        this.isExamStarted = true;
        let orderId = 1;
        this.exam = data;

        //Temp
        this.exam.questions.map(x => {
          x.answers.map(x=>x.correct = false);
        });
        this.exam.questions.map(x => x.orderId = orderId++);
        this.timeLeft = this.exam.timeLimit * 60;
        this.timeConvert(this.timeLeft);
        this.startTimer();
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