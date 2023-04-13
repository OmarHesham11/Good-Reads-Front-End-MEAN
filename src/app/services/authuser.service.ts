import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Admin } from '../Interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {

  constructor(private _router:Router, private _httpClient:HttpClient) {
    if(localStorage.getItem('userToken') != null ){
      this.saveCurrentUser();
    }
   }

  currentUser = new BehaviorSubject(null);

  saveCurrentUser(){
    let token:any = localStorage.getItem('userToken');
    this.currentUser.next(jwt_decode(token));
    // console.log(this.currentUser.getValue());
    // console.log(token);
  }

  loginUser(LoginFormData:Admin):Observable<any> {
    return this._httpClient.post('https://goodreads.onrender.com/user/login', LoginFormData);
  }

  logOut() {
    this.currentUser.next(null);
    localStorage.removeItem('userToken');
    this._router.navigate(['/home']);
  }

  userToken(){
    return localStorage.getItem('userToken');
  }

}
