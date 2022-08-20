import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // baseUri = "http://localhost:5000/";
  baseUri = "https://projectfsd.herokuapp.com/"

  constructor(private http: HttpClient) { }

  loginUser(user: any) {
    return this.http.post<any>(this.baseUri+"userlogin", user);
  }

  signup(user:any){
    return this.http.post<any>(this.baseUri+"usersignup", user);
  }

  getToken(){
    return localStorage.getItem("token");
  }

}
