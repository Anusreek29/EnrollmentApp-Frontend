import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { EmployerModel } from '../employers/employer.model';
import { EmployerService } from '../../services/employer.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-employer',
  templateUrl: './edit-employer.component.html',
  styleUrls: ['./edit-employer.component.css']
})

export class EditEmployerComponent {
  title: String = "Edit Employer";
  
  // employer: EmployerModel[] | any;

  name: any = '';
    
  employer = (this.name);

  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;

  constructor(private employerService: EmployerService, private notifyService: NotificationService, 
    private router: Router, private authService: AuthService){ }

  ngOnInit(): void {
    let id = localStorage.getItem('editEmployer')
    this.employerService.getEmployer(id)
    .subscribe((data) => {
      this.employer = JSON.parse(JSON.stringify(data))
      console.log(this.employer);
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

  employerEdit(){
    console.log(this.employer);
    this.employerService.editEmployer(this.employer)
    .subscribe(
      response => {
        console.log("success");
        this.router.navigate(['/employers']); 
      },
      err=>{
        console.log("failed");
        // alert("Update failed. Please try again later.")
        this.notifyService.showDanger(
          'Update failed. Please try again later.'
        );
      }
    ) 
  }  
  
}
