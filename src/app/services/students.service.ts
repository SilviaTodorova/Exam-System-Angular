import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { appResources } from 'src/environments/app.resources';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  apiUrl = environment.apiUrl;
  studentsResource = appResources.studentsResource;

  constructor(private http: HttpClient) { }

  getTest(data: any) : Observable<any> {
    return this.http
    .get(`${this.apiUrl}/${this.studentsResource}/tests/${data}`)
    .pipe(
      map( el => el) 
    );
  }
}
