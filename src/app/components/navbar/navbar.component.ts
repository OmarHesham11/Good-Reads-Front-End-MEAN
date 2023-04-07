import { Component } from '@angular/core';
import { Authadminservice } from '../../services/auth-admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  adminIsLogin:boolean = false;

  constructor(private _authAdmin:Authadminservice){
    this._authAdmin.currentAdmin.subscribe(() => {
      if(_authAdmin.currentAdmin.getValue()!= null) {
        this.adminIsLogin = true;
      }
      else {
        this.adminIsLogin = false;
      }
    })
  } 

  adminLogOut(){
    this._authAdmin.logOut();
  }

}
