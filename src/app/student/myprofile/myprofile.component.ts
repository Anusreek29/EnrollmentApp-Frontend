import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { EnrollModel } from '../../admin/approvals/enrollment.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  title: String = "My Profile";
  studentEdit: any ={address:'',qualification:'',passout:'',skillset:'',employmentStatus:'',technologyTraining:'',year:''}

  student: EnrollModel[] | any;

  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;
  
  constructor(private studentService: StudentService, private router: Router, 
    public http: HttpClient, private authService: AuthService, ) { }

  ngOnInit(): void {

    let email = localStorage.getItem('studentEmail');
    
    this.studentService.viewProfile(email)
    .subscribe((data) => {
      this.student = data;
      this.studentEdit.address=this.student.address
      this.studentEdit.qualification=this.student.qualification
      this.studentEdit.passout=this.student.passout
      this.studentEdit.skillset=this.student.skillset
      this.studentEdit.employmentStatus=this.student.employmentStatus
      this.studentEdit.technologyTraining=this.student.technologyTraining
      this.studentEdit.year=this.student.year
      console.log(data);

    });

    if(localStorage.getItem('role') == "admin"){
      this.adminCheck=true;
      console.log(this.adminCheck);
    }else if(localStorage.getItem('role') == "Employer"){
      this.employerCheck=true;
    }else if(localStorage.getItem('role') == "Student"){
      this.studentCheck=true;
    }else{
      console.log("logged out");
    }

  }

  // editProfile(student_id: any){
  //   localStorage.setItem('editProfile', student_id);
  //   console.log(student_id);
  //   this.router.navigate(['edit-profile']);
  //  }
updateStudent(){
  
  console.log(this.studentEdit)
  this.studentService.editProfile(this.studentEdit,this.student.email)
  .subscribe((data)=>{
    console.log(data)
    this.ngOnInit()
  })
}
}
