import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Interfaces/admin';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Authadminservice {

  
  constructor(private _router:Router, private _httpClient:HttpClient) {
    if(localStorage.getItem('adminToken') != null ){
      this.saveCurrentAdmin();
    }
   }

  currentAdmin = new BehaviorSubject(null);

  saveCurrentAdmin(){
    let token:any = localStorage.getItem('adminToken');
    this.currentAdmin.next(jwt_decode(token));
    // console.log(this.currentAdmin.getValue());
    // console.log(token);
  }

  loginAdmin(adminLoginFormData:Admin):Observable<any> {
    return this._httpClient.post('https://goodreads.onrender.com/admin/login', adminLoginFormData);
  }

  //
  // loginUser(adminLoginFormData:Admin):Observable<any> {
  //   return this._httpClient.post('https://goodreads.onrender.com/user/login', adminLoginFormData);
  // }

  logOut() {
    this.currentAdmin.next(null);
    localStorage.removeItem('adminToken');
    this._router.navigate(['/admin/login']);
  }

  adminToken(){
    return localStorage.getItem('adminToken')
  }

 
}



