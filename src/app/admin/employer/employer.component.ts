import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../services/employer.service';
import { EmployerModel } from '../employers/employer.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  title: String = "Employer Data";

  employer: EmployerModel[] | any;

  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;

  constructor(private employerService: EmployerService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('viewemployer');
    
    this.employerService.getEmployer(id)
    .subscribe((data) => {
      this.employer = [data];
      console.log(data);
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
