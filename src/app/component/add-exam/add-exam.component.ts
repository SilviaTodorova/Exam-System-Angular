import { Component, OnInit } from '@angular/core';
import { Exam, Question, Answer } from 'src/app/models/exam/exam';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  model: Exam = new Exam();
  answers: Answer[] = [];
  questTitle: string;

  constructor(private modalService: NgbModal,) { }

  ngOnInit() {
    this.loadExam();
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

  add() {
    let orderIds = this.model.questions.map(x=>x.orderId).sort();
    let max = orderIds[orderIds.length-1];
    let newQuestion: Question = new Question();
    newQuestion.title = "xxx";
    newQuestion.orderId = max + 1;
    
    this.model.questions.push(newQuestion);
  }

  addAnswer() {
    let ids = this.answers.map(x=>x.intId).sort();
    let max = ids[ids.length-1];
    let newAnswer: Answer = new Answer();
    newAnswer.title = "xxx";
    newAnswer.intId = max + 1;
    
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

  selectAnswer(intId: number) {
    this.answers.forEach(x => {
      if (x.intId == intId) {
        x.selected = true;
      } else {
        x.selected = false;
      }
    })
  }

  //Service
  loadExam() {
    this.model = {
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

    console.log(this.model);
  }

  save(){
    console.log(this.model);
  }
}
