import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Interfaces/admin';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  requestOptions:object = { 
    observe: 'response'
  };

  constructor(private _router: Router, private _httpClient: HttpClient, private _cookieService:CookieService) {
   
    const token = this._cookieService.get('token');
    if (token) {
      this.saveCurrentUser();
    }
  }

  currentUser = new BehaviorSubject(null);

  saveCurrentUser() {
  
    let token = this._cookieService.get('token');
    if (token) {
      let decodedToken = jwt_decode(token);
      this.currentUser.next(decodedToken);
    } else {
      console.error('Invalid token: token is undefined or null');
    }
  }

  loginAdmin(adminLoginFormData: Admin): Observable<any> {
    return this._httpClient.post('https://goodreads.onrender.com/admin/login', adminLoginFormData);
  }

  logOut() {
    this.currentUser.next(null);
    this._cookieService.delete('token');
    
    this._router.navigate(['/admin/login']);
  }

  userLogin(userLoginFormData: Admin): Observable<any> {
    return this._httpClient.post('https://goodreads.onrender.com/user/login', userLoginFormData);
  }

  userLogOut() {
    this.currentUser.next(null);
    this._cookieService.delete('token');
    this._router.navigate(['/user/login']);
   
  }

  token() {
    console.log("hi",this._cookieService.get('token'));
    return this._cookieService.get('token');
  }

  userById(id: string) {
    return this._httpClient.get(`https://goodreads.onrender.com/user/${id}`, this.requestOptions);
  }

}

