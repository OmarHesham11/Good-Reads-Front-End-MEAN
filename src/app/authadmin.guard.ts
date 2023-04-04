import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Authadminservice } from './auth-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthadminGuard implements CanActivate {

  constructor(private _authAdmin:Authadminservice, private _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._authAdmin.currentAdmin.getValue() != null){
        return true;
      }
      else {
        this._router.navigate(['/admin/login']);
        return false;
      }
  }
  
}
