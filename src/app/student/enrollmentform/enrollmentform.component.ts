import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EnrollModel } from '../../admin/approvals/enrollment.model';
import { StudentService } from '../../services/student.service';
import { PaymentService } from '../../services/payment.service';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-enrollmentform',
  templateUrl: './enrollmentform.component.html',
  styleUrls: ['./enrollmentform.component.css']
})

export class EnrollmentformComponent implements OnInit {
  title: String = 'Enroll Here';
  
  adminCheck: boolean= false;
  employerCheck: boolean= false;
  studentCheck: boolean = false;

  enrollmentForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')])),
    phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$')])),
    address: new FormControl(''),
    qualification: new FormControl(''),
    passout: new FormControl(''),
    skillset: new FormControl(''),
    employmentStatus: new FormControl(''),
    technology: new FormControl(''),
    year: new FormControl(''),
    course: new FormControl(''),
    fee: new FormControl(''),
    image:  new FormControl(''),
    status: new FormControl('')
  })

  courses = [
    {name: "Data Science & Machine Learning", fee: "30000"}, {name: "Full Stack Development - MEAN", fee: "25000"}, 
    {name: "Software Testing", fee: "20000"}, {name: "Data Science & Analytics", fee: "30000"}, {name: "Robotic Process Automation", fee: "28000"}, 
    {name: "Cyber Security Analyst", fee: "24000"}, {name: "Digital Marketing", fee: "22000"}, {name: "Full Stack Development - MERN", fee: "25000"}
  ]

  enrollstudent = new EnrollModel("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "");

  constructor(private studentService: StudentService, private notifyService: NotificationService, 
    private router: Router, private payment:PaymentService, private authService: AuthService) { }

  ngOnInit(): void {

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

  options = {
    "key": "rzp_test_7HdkaZ1xFGPomB", // Enter the Key ID generated from the Dashboard
    "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "ICT Academy of Kerala",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": "", 
    //"callback_url":"https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  Enroll() {
    for(let i=0; i< this.courses.length; i++){
      if(this.courses[i].name == this.enrollstudent.course){
        this.enrollstudent.fee = this.courses[i].fee;
        this.options.amount = this.courses[i].fee + "00";
      }
    }

    this.enrollstudent.status = 'pending';
    this.studentService.enroll(this.enrollstudent);
    {
      let rzp1 = new this.payment.nativeWindow.Razorpay(this.options);
      rzp1.open();
      // alert("Please complete the payment");
      this.notifyService.showDanger(
        'Please complete the payment'
      );
    }
    console.log(this.enrollstudent);

    this.notifyService.showInfo(
      'Course Enrollment Successful'
    );
   
    this.router.navigate(['']);
    
    // window.location.reload();

  }
}
