import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/exam/exam';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {
  id: number;
  questionsList: Question[] = [];
  
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data'] != undefined) {
        this.id = params['data'].id;
        console.log(this.id);
      }
    });
  }

}
