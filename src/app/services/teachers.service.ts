import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from 'src/environments/environment';
import { appResources } from 'src/environments/app.resources';
import { map } from '../../../node_modules/rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

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

}
