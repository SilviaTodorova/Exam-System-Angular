import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';
import { environment } from 'src/environments/environment';
import { appResources } from 'src/environments/app.resources';
import { map } from '../../../node_modules/rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignIn } from '../models/login/sign-in';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = environment.apiUrl;
  teachersResource = appResources.teachersResource;

  private currentUsername: string;

  constructor(private http: HttpClient) {}

  register(data: any) : Observable<any[]> {
    return this.http
    .post(`${this.apiUrl}/${this.teachersResource}/register`, data, httpOptions)
    .pipe(
      map( el =><any[]> el) 
    );
  }

  login(data: any) : Observable<any[]> {
    return this.http
    .post(`${this.apiUrl}/${this.teachersResource}/login`, data, httpOptions)
    .pipe(
      map( el =><any[]> el) 
    );
  }

  setUsername(username: string){
    this.currentUsername = username;
  }

  getUsername(){
    return this.currentUsername;
  }
}
