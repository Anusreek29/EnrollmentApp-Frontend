import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { EnrollModel } from '../approvals/enrollment.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {

  title: String = "Student Profiles";
  
  student: EnrollModel[] | any;

  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;

  constructor(private studentService: StudentService, private notifyService: NotificationService, 
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // this.student.status = 'approved';
    this.studentService.getStudents()
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

  viewStudent(student_id: any){ 
    localStorage.setItem('viewstudent', student_id);
    this.router.navigate(['student']);
  }
  
  editStudent(student_id: any){
    localStorage.setItem('editStudent', student_id);
    console.log(student_id);
    this.router.navigate(['edit-student']);
   }

  deleteStudent(student_id: any){
    this.studentService.deleteStudent(student_id)
    .subscribe((data)=>{
      console.log(data);
    });

    window.location.reload();
    this.notifyService.showInfo(
      'Deleted Successfully'
    );
  }

}
