import { Component, OnInit } from '@angular/core';
import { ExamResults } from 'src/app/models/results/exam-results';
import { TeachersService } from 'src/app/services/teachers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngbd-rating',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit{
  exams: ExamResults[] = [];

  constructor(private router: Router,
              private teachersService: TeachersService) { }

  ngOnInit() {
    this.loadExams();
  }

  //Serivces
  loadExams(){
    this.teachersService.getAllTestByOwner().subscribe(data => {
      this.exams = data;

      this.exams.map(x=>x.average = 0);
      console.log(this.exams);
    }, error => {
      if(error.error.message){
        alert(error.error.message);
      }
      this.router.navigate(['/dashboard']);
    });

  }
}
