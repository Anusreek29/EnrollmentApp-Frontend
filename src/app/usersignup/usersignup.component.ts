import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from './user.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})

export class UsersignupComponent {

  title: String = 'Register Here';

  signUpForm!: FormGroup;

  constructor(private formbuilder: FormBuilder, private userService: UserService, 
    private notifyService: NotificationService, private router: Router, private auth: AuthService){
    this.signUpForm = this.formbuilder.group({
      name: new FormControl(''),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')])),
      confirmpassword: new FormControl('', Validators.compose([Validators.required])),
      role: new FormControl('', Validators.compose([Validators.required]))
    },
    { validators: this.Mustmatch('password', 'confirmpassword') }
  )}
  
  get f(){
    return this.signUpForm.controls
  }

  Mustmatch(password: any, confirmpassword: any){
    return (formGroup: FormGroup) => {
      const passwordcontrol = formGroup.controls[password];
      const confirmpasswordcontrol = formGroup.controls[confirmpassword];

      if(confirmpasswordcontrol.errors && !confirmpasswordcontrol.errors['Mustmatch']){
        return;
      }
      
      if(passwordcontrol.value !== confirmpasswordcontrol.value){
        confirmpasswordcontrol.setErrors({Mustmatch: true})
      } else{
        confirmpasswordcontrol.setErrors(null);
      }
    }
  }

  adduser = new UserModel("", "", "", "");

  AddUser(value: any) {
    const user = {
      name: value.name,
      email: value.email,
      password: value.password,
      role: value.role      
    }

    console.log(value);
    console.log(user);
    this.auth.signup(user)
      .subscribe((data) => {
        let status = data.status;
        console.log(status);
        console.log(data.reason);
    
      if(!status){
        // alert("User already exists");
        this.notifyService.showDanger(
          'User already exists'
        );
        window.location.reload();
      }
      else{
        console.log("new user added");
        // alert("new user added");
        this.notifyService.showInfo(
          'Sign Up Successful'
        );
        this.router.navigate(["userlogin"]);
      }

    });
  }
}
