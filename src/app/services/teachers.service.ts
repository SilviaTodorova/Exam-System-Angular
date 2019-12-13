import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from 'src/environments/environment';
import { appResources } from 'src/environments/app.resources';
import { map } from '../../../node_modules/rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  apiUrl = environment.apiUrl;
  teachersResource = appResources.teachersResource;

  constructor(private http: HttpClient, 
              private accountService: AccountService) { }

  createTest(data: any) : Observable<any> {
    let username = "silvijati"; //this.accountService.getUsername();
    return this.http
    .post(`${this.apiUrl}/${this.teachersResource}/tests?username=${username}`, data, httpOptions)
    .pipe(
      map( el => el) 
    );
  }

  getTest(data: any) : Observable<any> {
    return this.http
    .get(`${this.apiUrl}/${this.teachersResource}/tests/${data}`)
    .pipe(
      map( el => el) 
    );
  }

  getAllTestByOwner() : Observable<any> {
    let username = "silvijati"; //this.accountService.getUsername();
    return this.http
    .get(`${this.apiUrl}/${this.teachersResource}/${username}/tests`)
    .pipe(
      map( el => el) 
    );
  }

  createQuestionToTest(title: string, data: any) : Observable<any> {
    return this.http
    .post(`${this.apiUrl}/${this.teachersResource}/tests/${title}/questions`, data, httpOptions)
    .pipe(
      map( el => el) 
    );
  }

  removeQuestion(data: any){
    return this.http
    .delete(`${this.apiUrl}/${this.teachersResource}/questions/${data}`, httpOptions)
    .pipe(
      map( el => el) 
    );
  }

}
