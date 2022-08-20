import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { EnrollModel } from './enrollment.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  title: String = "Course Enrollments";
  
  student: EnrollModel[] | any;

  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;
  
  constructor(private studentService: StudentService, private notifyService: NotificationService, 
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.studentService.getEnrolledStudents()
      .subscribe((data) => {
      this.student = JSON.parse(JSON.stringify(data));
      console.log(this.student);
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

      window.location.reload()
    })
  }

  viewStudent(student_id: any){ 
    localStorage.setItem('viewstudent', student_id);
    this.router.navigate(['student']);
  }

}
