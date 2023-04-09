import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {

  constructor(private _httpClient:HttpClient) { }

  registerUser(formUserData:any):Observable<any> {

    return this._httpClient.post('the api of signup',formUserData);
    
  }

}
