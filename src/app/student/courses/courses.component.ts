import { Component, OnInit } from '@angular/core';
import { CourseModel } from './course.model';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  title: String = "Courses We Offer";
  
  courses: CourseModel[] | any;
  
  constructor(public courseService: CourseService, public router: Router, public http: HttpClient) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = JSON.parse(JSON.stringify(data));
      console.log(this.courses);
    });
    
    
  }  

  enroll(){ }

}
