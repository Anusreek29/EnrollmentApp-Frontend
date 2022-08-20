import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  constructor(public http: HttpClient) { }
  
  getCourses() {
    return this.http.get('https://projectfsd.herokuapp.com/courses');
  }

}