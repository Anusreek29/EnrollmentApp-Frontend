import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../services/employer.service';
import { EmployerModel } from './employer.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css']
})

export class EmployersComponent implements OnInit {

  title: String = "Employers";
  
  employer: EmployerModel[] | any;

  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;

  constructor(private employerService: EmployerService, private notifyService: NotificationService, 
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.employerService.getEmployers().subscribe((data) => {
      this.employer = JSON.parse(JSON.stringify(data));
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

  viewEmployer(employer_id: any){ 
    localStorage.setItem('viewemployer', employer_id);
    this.router.navigate(['employer']);
  }
  
  editEmployer(employer_id: any){
    localStorage.setItem('editEmployer', employer_id);
    console.log(employer_id);
    this.router.navigate(['edit-employer']);
   }

  deleteEmployer(employer_id: any){
    this.employerService.deleteEmployer(employer_id)
    .subscribe((data)=>{
      console.log(data);
    });

    window.location.reload();
    this.notifyService.showInfo(
      'Deleted Successfully'
    );
  }

}
