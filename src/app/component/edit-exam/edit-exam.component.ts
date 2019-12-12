import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam, Question, Answer } from 'src/app/models/exam/exam';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})

export class EditExamComponent implements OnInit {
  questTitle: string = "";
  model: Exam = new Exam();
  orderId: number = 0;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private teachersService: TeachersService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['title'] != undefined) {
        this.questTitle = params['title'];
        this.loadExam();
      }
    });
  }

  // Questions part
  addQuestion() {
    let max = 0;
    if (this.model.questions && this.model.questions.length > 0) {
      let orderIds = this.model.questions.map(x => x.orderId).sort();
      max = orderIds[orderIds.length - 1];
    } else {
      this.model.questions = [];
    }

    let newQuestion: Question = new Question();
    newQuestion.title = "Въведете въпрос";
    newQuestion.orderId = max + 1;

    this.model.questions.push(newQuestion);
  }

  changeValueQuestionTitle(orderId: number, event: any) {
    if (this.model.questions) {
      this.model.questions = this.model.questions.map(x => {
        let tmp: Question = new Question();
        tmp.orderId = x.orderId;
        tmp.answers = x.answers;
        tmp.intId = x.intId;

        if (x.orderId == orderId) {
          tmp.title = event.target.textContent;
        } else {
          tmp.title = x.title;
        }

        return tmp;
      })
    }
  }

  //TODO:
  removeQuestion(id: any) {
    this.model.questions.splice(id, 1);
  }

  // Answers part
  openModal(content, orderId) {
    this.modalService.open(content, { centered: true, size: 'lg' });
    this.orderId = orderId;

    let orderAnsId = 1;
    if (!this.model.questions[orderId - 1].answers) {
      this.model.questions[orderId - 1].answers = [];
    }

    this.model.questions[orderId - 1].answers.map(x => x.orderId = orderAnsId++);
  }

  addAnswer() {
    let max = 0;
    if (this.model.questions[this.orderId - 1].answers && this.model.questions[this.orderId - 1].answers.length > 0) {
      let orderIds = this.model.questions[this.orderId - 1].answers.map(x => x.orderId).sort();
      max = orderIds[orderIds.length - 1];
    } else {
      this.model.questions[this.orderId - 1].answers = [];
    }

    let newAnswer: Answer = new Answer();
    newAnswer.title = "Въведете въпрос";
    console.log("max", max);
    newAnswer.orderId = (max) ? max + 1 : 1;

    console.log(newAnswer);
    this.model.questions[this.orderId - 1].answers.push(newAnswer);
  }

  selectAnswer(orderId: number) {
    this.model.questions[this.orderId - 1].answers.map(x => {
      if (x.orderId == orderId) {
        x.correct = true;
      } else {
        x.correct = false;
      }
    })
  }

  changeValueAnswerTitle(orderId: number, event: any) {
    let order = 1;
    if (this.model.questions[this.orderId - 1].answers) {
      this.model.questions[this.orderId - 1].answers = this.model.questions[this.orderId - 1].answers.map(x => {
        let tmp: Answer = new Answer();
        tmp.intId = x.intId;
        tmp.correct = x.correct;
        tmp.orderId = order++;

        console.log(orderId, x.orderId);
        if (x.orderId == orderId) {
          tmp.title = event.target.textContent;
        } else {
          tmp.title = x.title;
        }

        return tmp;
      })
    }
  }

  //TODO:
  removeAnswer(id: any) {
    this.model.questions[this.orderId - 1].answers.splice(id - 1, 1);
  }

  //Service
  loadExam() {
    this.teachersService.getTest(this.questTitle).subscribe(data => {
      this.model = data;

      let orderId: number = 1;
      if (this.model.questions) {
        this.model.questions.map(x => x.orderId = orderId++);
      }
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      }
    });
  }

  saveQuestion() {
    let question: Question = this.model.questions[this.orderId - 1];
    let answers = question.answers.map(x => {
      let tmp = {
        title: x.title,
        correct: x.correct
      };

      return tmp;
    });
    let bind = {
      title: question.title,
      answers: answers
    };

    this.teachersService.createQuestionToTest(this.questTitle, bind).subscribe(data => {
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      }else{
        alert("Error");
      }
      this.router.navigate(['/component/teacher-exam']);
    });
  }

}
