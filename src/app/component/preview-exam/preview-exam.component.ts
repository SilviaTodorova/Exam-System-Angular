import { Component, OnInit } from '@angular/core';
import { Exam, Answer, Question } from 'src/app/models/exam/exam';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview-exam',
  templateUrl: './preview-exam.component.html',
  styleUrls: ['./preview-exam.component.css']
})
export class PreviewExamComponent implements OnInit {
  id: number;
  questionsList: Question[] = [];
  
  constructor( private modalService: NgbModal,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data'] != undefined) {
        this.id = params['data'].id;
        console.log(this.id);
      }
    });

    this.loadExam();

  }

  model: Exam = new Exam();
  answers: Answer[] = [];
  questTitle: string;

  editField: string;


  openModal(content, orderId) {
    this.modalService.open(content, { centered: true,size: 'lg' });

    console.log(this.model.questions.filter(x=>x.answers)[0]);
    this.answers = this.model.questions.filter(x=>x.orderId == orderId)[0].answers;
    console.log("XX",this.model.questions.filter(x=>x.orderId == orderId)[0].title);
    this.questTitle = this.model.questions.filter(x=>x.orderId == orderId)[0].title;
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

}
