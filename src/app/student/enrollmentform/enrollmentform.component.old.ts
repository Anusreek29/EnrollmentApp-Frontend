import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EnrollModel } from '../../admin/approvals/enrollment.model';
import { StudentService } from '../../services/student.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-enrollmentform',
  templateUrl: './enrollmentform.component.html',
  styleUrls: ['./enrollmentform.component.css']
})

export class EnrollmentformComponent implements OnInit {
  title: String = 'Enroll Here';

  enrollmentForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    email: new UntypedFormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')])),
    phone: new UntypedFormControl('', Validators.compose([Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')])),
    address: new UntypedFormControl(''),
    qualification: new UntypedFormControl(''),
    passout: new UntypedFormControl(''),
    skillset: new UntypedFormControl(''),
    employmentStatus: new UntypedFormControl(''),
    technology: new UntypedFormControl(''),
    year: new UntypedFormControl(''),
    course: new UntypedFormControl(''),
    fee: new UntypedFormControl(''),
    image:  new UntypedFormControl(''),
    status: new UntypedFormControl('')
  })
  
  // onSubmit(value:any){
  //   console.log(value);
  // }

  enrollstudent = new EnrollModel("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");

  constructor(private studentService: StudentService, private notifyService: NotificationService, private router: Router) { }

  ngOnInit(): void {
  }

  Enroll() {
    this.enrollstudent.status = 'pending';
    this.studentService.enroll(this.enrollstudent)
    .subscribe(data => { 
      console.log(data) 
    });
    // alert("Enrolled!");
    this.notifyService.showInfo(
      'Course Enrollment Successful'
    );
    console.log(this.enrollstudent);
    this.router.navigate(['/courses']);
  }
}
