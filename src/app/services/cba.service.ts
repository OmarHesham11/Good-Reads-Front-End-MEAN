import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authadminservice } from './auth-admin.service';

@Injectable({
  providedIn: 'root'
})
export class CBAService {

  constructor(private _httpClient:HttpClient, private _authAdmin:Authadminservice) { 

  }

  headers = new HttpHeaders({
    'Authorization': `${this._authAdmin.adminToken()}`
  });
  requestOptions = { headers: this.headers };


  getCBA(mediaType:string, pageSize:number, currentPage:number):Observable<any> {
    return this._httpClient.get(`https://goodreads.onrender.com/${mediaType}/?page=${currentPage}&limit=${pageSize}`, this.requestOptions);
  }

  deleteCBA(mediaType:string, id:string):Observable<any> {
    return this._httpClient.delete(`https://goodreads.onrender.com/${mediaType}/${id}`, this.requestOptions);
  }

  patchCBA(mediaType:string, id:string, FormData:object):Observable<any> {
    return this._httpClient.patch(`https://goodreads.onrender.com/${mediaType}/${id}`, FormData, this.requestOptions);
  }

  postCBA(mediaType:string, FormData:object):Observable<any> {
    return this._httpClient.post(`https://goodreads.onrender.com/${mediaType}`, FormData, this.requestOptions);
  }

}
