import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { EnrollModel } from '../approvals/enrollment.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {

  title: String = "Student Data";

  student: EnrollModel[] | any;

  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;

  constructor(private studentService: StudentService, private router: Router, 
    private authService: AuthService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('viewstudent');
    
    this.studentService.getStudent(id)
    .subscribe((data) => {
      this.student = [data];
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

  approveStudent(email: any){
    console.log(email);
   
    this.studentService.approve(email)
    .subscribe((data) => {
      console.log(data);     
      // alert("approved");
      this.notifyService.showInfo(
        'Enrollment Approved'
      );

      // window.location.reload()
      this.router.navigate(['/approvals']);
    })
  }

}
