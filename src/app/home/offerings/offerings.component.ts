import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../../student/courses/course.model';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.css']
})

export class OfferingsComponent implements OnInit {
  courses: CourseModel[] | any;

  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;

  constructor(public courseService: CourseService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = JSON.parse(JSON.stringify(data));
      console.log(this.courses);
    });

    if(localStorage.getItem('role') == "admin"){
      this.adminCheck=true;
      console.log(this.adminCheck)
    }else if(localStorage.getItem('role') == "Employer"){
      this.employerCheck=true;
    }else if(localStorage.getItem('role') == "Student"){
      this.studentCheck=true;
    }else{
      console.log("user logged out")
    }

  }

}
