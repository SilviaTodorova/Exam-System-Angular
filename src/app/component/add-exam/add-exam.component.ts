import { Component, OnInit } from '@angular/core';
import { Exam, Question, Answer } from 'src/app/models/exam/exam';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeachersService } from 'src/app/services/teachers.service';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  model: Exam = new Exam();
  answers: Answer[] = [];
  questTitle: string;
  username: string;

  constructor(private modalService: NgbModal,
              private router: Router, 
              private accountService: AccountService,
              private teachersService: TeachersService) { }

  ngOnInit() {
    this.username = this.accountService.getUsername();
  }

  editField: string;

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.model.questions[id][property] = editField;
  }

  remove(id: any) {
    this.model.questions.splice(id, 1);
  }

  removeAnswer(id: any) {
     this.answers.splice(id, 1);
   }

  addQuestion() {
    let max = 0;
    if(this.model.questions) {
      let orderIds =  this.model.questions.map(x=>x.orderId).sort();
      max = orderIds[orderIds.length-1];
    }else{
      this.model.questions = [];
    }
   
    let newQuestion: Question = new Question();
    newQuestion.title = "Въведете въпрос";
    newQuestion.orderId = max + 1;
    
    this.model.questions.push(newQuestion);
  }

  addAnswer() {
    let ids = this.answers.map(x=>x.id).sort();
    let max = ids[ids.length-1];
    let newAnswer: Answer = new Answer();
    newAnswer.title = "xxx";
    newAnswer.id = max + 1;
    
    this.answers.push(newAnswer);

  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  openModal(content, orderId) {
    this.modalService.open(content, { centered: true,size: 'lg' });

    console.log(this.model.questions.filter(x=>x.answers)[0]);
    this.answers = this.model.questions.filter(x=>x.orderId == orderId)[0].answers;
    console.log("XX",this.model.questions.filter(x=>x.orderId == orderId)[0].title);
    this.questTitle = this.model.questions.filter(x=>x.orderId == orderId)[0].title;
  }

  selectAnswer(id: number) {
    this.answers.forEach(x => {
      if (x.id == id) {
        x.correct = true;
      } else {
        x.correct = false;
      }
    })
  }

  //Service
  createTest(){
    let bind = {
      title: this.model.title,
      countQuestions: this.model.countQuestions,
      timeLimit: this.model.timeLimit
    };

    console.log("bind", bind);
    this.teachersService.createTest(bind).subscribe(data => {
      alert(data.message);
      this.router.navigate(['/component/teacher-exam']);
    }, error => {
      if(error.error.message){
        alert(error.error.message);
      }else{
        alert("Server error");
      }
      
    });
  }
}
