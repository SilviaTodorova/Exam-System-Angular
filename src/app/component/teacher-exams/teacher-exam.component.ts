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
  examList: Exam[] = [];
  index: number = 0;

  constructor(private router: Router, 
              private modalService: NgbModal,
              private teachersService: TeachersService) { }


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
    this.router.navigate(['/component/preview-exam'], { 
     queryParams: { title: title } 
    });
  }

  openModal(content, index: number) {
    this.index = index;
    this.modalService.open(content, { centered: true });
  }

  //Serivces
  loadExams(){
    this.teachersService.getAllTestByOwner().subscribe(data => {
      this.examList = data;
    }, error => {
      if(error.error.message){
        alert(error.error.message);
      }else{
        alert("Server error");
      }
      this.router.navigate(['/component/teacher-exam']);
    });

  }

  
  deleteExam() {
    //this.examList.splice(this.index, 1);
    this.teachersService.deleteTest(this.examList[this.index].title).subscribe(data => {
      this.loadExams();
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
