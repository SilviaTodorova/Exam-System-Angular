import { Component, OnInit } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Exam } from 'src/app/models/exam/exam';

import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-ngbd-progressbar',
  templateUrl: './teacher-exam.component.html',
  styleUrls: ['./teacher-exam.component.css'],
  providers: [NgbProgressbarConfig]
})
export class TeacherExamComponent implements OnInit {
  examList: Array<Exam> = [];
  index: number = 0;

  constructor(private router: Router, 
              private modalService: NgbModal,
              private teacherService: TeachersService) { }


  ngOnInit() {
    this.loadExams();
  }

  addExam() {
    this.router.navigate(['/component/add-exam']);
  }

  editExam(title: number) {
    this.router.navigate(['/component/edit-exam'], { 
      queryParams: { title: title } 
    });
  }

  previewExam(title: string) {
    console.log("ccc", title);
    this.router.navigate(['/component/preview-exam'], { 
     queryParams: { title: title } 
    });
  }

  openModal(content, index: number) {
    this.index = index;
    this.modalService.open(content, { centered: true });
  }

  deleteExam() {
    // TODO: call service
    this.examList.splice(this.index, 1);
  }

  //Serivces
  loadExams(){
    this.examList = [
      { intId: 1, title: 'Feelings', countQuestions: 123, timeLimit: 0, questions: null }
    ];
  }
}
