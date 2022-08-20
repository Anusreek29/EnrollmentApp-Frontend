import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AboutComponent } from './home/about/about.component';
import { AchievementsComponent } from './home/achievements/achievements.component';
import { FooterComponent } from './home/footer/footer.component';
import { IndexComponent } from './home/index/index.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { OfferingsComponent } from './home/offerings/offerings.component';
import { ApprovalsComponent } from './admin/approvals/approvals.component';
import { EditEmployerComponent } from './admin/edit-employer/edit-employer.component';
import { EditStudentComponent } from './admin/edit-student/edit-student.component';
import { EmployerComponent } from './admin/employer/employer.component';
import { EmployersComponent } from './admin/employers/employers.component';
import { StudentComponent } from './admin/student/student.component';
import { StudentsComponent } from './admin/students/students.component';
import { CoursesComponent } from './student/courses/courses.component';
import { EnrollmentformComponent } from './student/enrollmentform/enrollmentform.component';
import { MyprofileComponent } from './student/myprofile/myprofile.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UsersignupComponent } from './usersignup/usersignup.component';
import { SearchComponent } from './admin/search/search.component';

import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import {searchPipe} from './pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AchievementsComponent,
    FooterComponent,
    IndexComponent,
    NavbarComponent,
    OfferingsComponent,
    ApprovalsComponent,
    EditEmployerComponent,
    EditStudentComponent,
    EmployerComponent,
    EmployersComponent,
    StudentComponent,
    StudentsComponent,    
    CoursesComponent,
    EnrollmentformComponent,
    MyprofileComponent,
    UserloginComponent,
    UsersignupComponent,
    SearchComponent,
    searchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
