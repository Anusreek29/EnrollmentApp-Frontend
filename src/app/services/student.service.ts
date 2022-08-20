import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(public http: HttpClient) { }

  enroll(item: any) {
    return this.http.post('https://projectfsd.herokuapp.com/enroll', { item })
    .subscribe(data => { 
      console.log(data) 
    });
  }

  getEnrolledStudents() {
    return this.http.get('https://projectfsd.herokuapp.com/approvals');
  }

  approve(email: any) {
   return this.http.post('https://projectfsd.herokuapp.com/approvals', {email: email});
 }

  getStudents() {
    return this.http.get('https://projectfsd.herokuapp.com/students');
  }

  getStudent(id: any){
    return this.http.get("https://projectfsd.herokuapp.com/student/" + id); 
  }

  editStudent(data: any) {
    return this.http.put(`https://projectfsd.herokuapp.com/edit-student`, {"student": data});
  }

  deleteStudent(id: any) {
    return this.http.delete("https://projectfsd.herokuapp.com/deletestudent/" + id);
  }

  viewProfile(email: any){
    return this.http.get("https://projectfsd.herokuapp.com/myprofile/" + email); 
  }

  editProfile(data: any,email: any) {
    return this.http.put(`https://projectfsd.herokuapp.com/edit-profile`, {student:data,email:email });
  }
  getSearchStudents() {
    return this.http.get('https://projectfsd.herokuapp.com/searchstudents');
  }
}
