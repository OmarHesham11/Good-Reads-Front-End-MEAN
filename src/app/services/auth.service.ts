import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Interfaces/admin';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private _router:Router, private _httpClient:HttpClient) {
    if(localStorage.getItem('token') != null ){
      this.saveCurrentUser();
    }
   }

  currentUser = new BehaviorSubject(null);

  saveCurrentUser(){
    let token:any = localStorage.getItem('token');
    this.currentUser.next(jwt_decode(token));
    // console.log(this.currentAdmin.getValue());
    // console.log(token);
  }

  loginAdmin(adminLoginFormData:Admin):Observable<any> {
    return this._httpClient.post('https://goodreads.onrender.com/admin/login', adminLoginFormData);
  }

  logOut() {
    this.currentUser.next(null);
    localStorage.removeItem('token');
    this._router.navigate(['/admin/login']);
  }
 
  userLogin(userLoginFormData:Admin):Observable<any> {
    return this._httpClient.post('https://goodreads.onrender.com/user/login', userLoginFormData);
  }

  userLogOut() {
    this.currentUser.next(null);
    localStorage.removeItem('token');
    this._router.navigate(['/user/login']);
  }

  token(){
    return localStorage.getItem('token')
  }
 
}

