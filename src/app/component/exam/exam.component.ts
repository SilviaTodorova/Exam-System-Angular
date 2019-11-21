import { Component, OnInit } from '@angular/core';
import { Exam, Question, Answer } from '../../models/exam/exam';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export class ExamComponent implements OnInit {
  isExamStarted: boolean;
  examCode: string;
  exam: Exam;
  currQuestion: Question;
  constructor() { }

  ngOnInit() {
    this.exam = new Exam();
    this.exam.title = "XML технологии за семантичен Уеб";
    this.exam.countQuestions = 2;

    let q1 = new Question();
    q1.orderId = 1;
    q1.title = "Параметричните единици (Parameter Entities) са декларирани в DTD и се използват:";
    
    let a1 = new Answer();
    a1.intId = 1;
    a1.title = "единствено в декларациите на DTD";
    a1.selected = false;

    let a2 = new Answer();
    a2.intId = 2;
    a2.title = "нито в декларациите на DTD, нито в XML документа";
    a2.selected = false;

    let a3 = new Answer();
    a3.intId = 3;
    a3.title = "единствено в XML документа";
    a3.selected = false;

    let a4 = new Answer();
    a4.intId = 4;
    a4.title = "както в декларациите на DTD, така и в XML документа";
    a4.selected = false;

    q1.answers = [a1,a2,a3,a4];

    let q2 = new Question();
    q2.orderId = 2;
    q2.title = "XXXXX";
    q2.answers = [a1,a2,a3,a4];

    this.exam.questions = [q1,q2];

    this.currQuestion = q1;
    //console.log(this.exam.questions);
    //console.log(q1);
  }

  startExam(){
    this.isExamStarted = true;
  }

  finishExam(){
    console.log(this.exam);
  }

  nextQuestion(){
    let orderId = (this.currQuestion.orderId < this.exam.countQuestions) ? this.currQuestion.orderId + 1 : this.currQuestion.orderId;
    console.log("answers", this.currQuestion.answers);

    this.exam.questions.forEach(x=>{
      if(x.orderId == this.currQuestion.orderId){
        x.answers = this.currQuestion.answers;
      }
    })

    console.log("questions", this.exam.questions);
    console.log(orderId);
    this.currQuestion = this.exam.questions.filter(x=>x.orderId == orderId)[0];
  
    console.log("next", this.currQuestion);
  }

  previousQuestion(){
    let orderId = (this.currQuestion.orderId > 1) ? this.currQuestion.orderId - 1 : this.currQuestion.orderId;
    //console.log(orderId);
    this.currQuestion = this.exam.questions.filter(x=>x.orderId == orderId)[0];
    //console.log("prev", this.currQuestion);
  }

  selectAnswer(intId: number){
    this.currQuestion.answers.forEach(x=>{
      if(x.intId == intId){
        x.selected = true;
      }else{
        x.selected = false;
      }
    })
  }
}
