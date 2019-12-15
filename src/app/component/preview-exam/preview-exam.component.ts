import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import { Exam, Question } from 'src/app/models/exam/exam';

import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-preview-exam',
  templateUrl: './preview-exam.component.html',
  styleUrls: ['./preview-exam.component.css']
})
export class PreviewExamComponent implements OnInit {
  id: number;

  orderId: number;
  questionsList: Question[] = [];
  model: Exam = new Exam();

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

  openModal(content, orderId) {
    this.modalService.open(content, { centered: true,size: 'lg' });
    this.orderId = orderId;
  }

  //Service
  loadExam() {
    this.teachersService.getTest(this.id).subscribe(data => {
      this.model = data;

      let orderId: number = 1;
      if(this.model.questions){
        this.model.questions.map(x=>{
          x.orderId = orderId++;

          let ansOrderId = 1;
          if(x.answers){
            x.answers.map(ans=>ans.orderId = ansOrderId++);
          }
        });
      }

    }, error => {
      if(error.error.message){
        alert(error.error.message);
      }else{
        alert("Server error");
      }
      this.router.navigate(['/component/teacher-exam']);
    });

  }
    
}
