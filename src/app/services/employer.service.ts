import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(public http: HttpClient) { }

  getEmployers() {
    return this.http.get('https://projectfsd.herokuapp.com/employers');
  }

  getEmployer(id: any){
    return this.http.get("https://projectfsd.herokuapp.com/employer/" + id); 
  }

  editEmployer(data: any) {
    return this.http.put(`https://projectfsd.herokuapp.com/edit-employer`, {"employer": data});
  }

  deleteEmployer(id: any) {
    return this.http.delete("https://projectfsd.herokuapp.com/deleteemployer/" + id);
  }
}
