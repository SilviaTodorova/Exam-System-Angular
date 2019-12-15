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
  id: number = 0;

  model: Exam = new Exam();
  orderId: number = 0;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private teachersService: TeachersService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.id = params['id'];
        this.loadExam();
      }

    });
  }

  // Questions part
  addQuestion() {
    let max = 0;
    if (this.model.questions && this.model.questions.length > 0) {
      //this.model.questions = this.model.questions.sort((x,y)=>x.id - y.id);
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
      this.saveQuestion(event.target.textContent);
    }
  }

  // Answers part
  openModal(content, orderId) {
    this.modalService.open(content, { centered: true, size: 'lg' });
    this.orderId = orderId;
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
    newAnswer.title = "Въведете отговор";
    newAnswer.orderId = (max) ? max + 1 : 1;

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

    this.updateAnswers();
  }

  changeValueAnswerTitle(orderId: number, event: any) {
    let order = 1;
    if (this.model.questions[this.orderId - 1].answers) {
      this.model.questions[this.orderId - 1].answers = this.model.questions[this.orderId - 1].answers.map(x => {
        let tmp: Answer = new Answer();
        tmp.id = x.id;
        tmp.correct = x.correct;
        tmp.orderId = order++;

        if (x.orderId == orderId) {
          tmp.title = event.target.textContent;
        } else {
          tmp.title = x.title;
        }

        return tmp;
      })

      this.updateAnswers();
    }
  }

  //Service
  loadExam() {
    this.teachersService.getTest(this.id).subscribe(data => {
      this.model = data;

      let orderId: number = 1;
      if (this.model.questions) {
        this.model.questions = this.model.questions.sort((x, y) => x.id - y.id);

        this.model.questions.map(x => x.orderId = orderId++);

        this.model.questions.map(x => {
          if (x.answers) {
            let orderAnsId = 1;
            if (!x.answers) {
              x.answers = [];
            }

            x.answers.map(x => x.orderId = orderAnsId++);
          }
        })
      }
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server error");
      }
    });
  }

  updateExam() {
    let bind = {
      title: this.model.title,
      timeLimit: this.model.timeLimit,
      countQuestions: this.model.countQuestions
    };

    this.teachersService.updateTest(this.id, bind).subscribe(data => {
      this.loadExam();
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server error");
      }
    });
  }

  removeQuestion(id: any) {
    let questionId = this.model.questions[id].id;
    this.teachersService.removeQuestion(questionId).subscribe(data => {
      this.loadExam();
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server error");
      }

      this.router.navigate(['/component/teacher-exam']);
    });
  }

  saveQuestion(title: string) {
    let bind = {
      title: title,
      answers: []
    };

    this.teachersService.createQuestionToTest(this.id, bind).subscribe(data => {
      this.loadExam();
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server error");
      }
      this.router.navigate(['/component/teacher-exam']);
    });
  }

  updateAnswers() {
    let questionId = this.model.questions[this.orderId - 1].id;

    let answers = this.model.questions[this.orderId - 1].answers.map(x => {
      let tmp = {
        title: x.title,
        correct: x.correct
      };

      return tmp;
    });

    this.teachersService.updateAnswers(questionId, answers).subscribe(data => {
      //this.loadExam();
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server error");
      }
    });
  }

  removeAnswer(answerId: any) {
    let questionId = this.model.questions[this.orderId - 1].id;
    this.teachersService.removeAnswer(questionId, answerId).subscribe(data => {
      this.loadExam();
    }, error => {
      if (error.error.message) {
        alert(error.error.message);
      } else {
        alert("Server error");
      }
    });
  }
}
