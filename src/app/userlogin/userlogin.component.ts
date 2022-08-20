import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  title: String = 'Welcome User';
  
  user = { email: '', password: '', role: '' };

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  
  validateLogin(value: any){
    this.auth.loginUser(value)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);

          if(res.status){
            if(res.role == "Employer"){
              this.route.navigate(['searchstudent'])
                .then(() => {
                  window.location.reload();
                });
              //window.location.reload()
            }
            else if(res.role == "Student"){
              localStorage.setItem('studentEmail', res.email)
              this.route.navigate(['courses']) 
                .then(() => {
                  window.location.reload();
                });  
            }
            else if(res.role == "admin"){ 
              this.route.navigate([''])
                .then(() => {
                  window.location.reload();
              });
            }
          }else{
            alert('invalid credentials');
          }

          

        });
  }
}
