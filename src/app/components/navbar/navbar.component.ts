import { Component } from '@angular/core';
import { Authadminservice } from '../../services/auth-admin.service';
import { CBAService } from 'src/app/services/cba.service';
import { AuthuserService } from 'src/app/services/authuser.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  adminIsLogin:boolean = false;
  userIsLogin:boolean = false;
  nav:any;

  constructor(private _authAdmin:Authadminservice, private _CBAService:CBAService, private _authUser:AuthuserService){
    this._authAdmin.currentAdmin.subscribe(() => {
      if(_authAdmin.currentAdmin.getValue()!= null) {
        this.adminIsLogin = true;
       
      }
      else {
        this.adminIsLogin = false;
        
      }
    });

    this._authUser.currentUser.subscribe(() => {
      if(_authUser.currentUser.getValue()!= null) {
        this.userIsLogin = true;
      }
      else {
        this.userIsLogin = false;
      }
    })

    if(this.adminIsLogin === true) {
      this.nav = this.adminIsLogin;
      console.log("ana fe el admin",this.adminIsLogin);
      console.log(this.nav);
      
    }
    else if(this.userIsLogin === true){
      this.nav = this.userIsLogin;
      console.log("ana fe el user",this.userIsLogin);
      console.log(this.nav);
      
    }
  } 

  logOut(){
    if(this.adminIsLogin === true) {
      this._authAdmin.logOut();
    }
    else if(this.userIsLogin === true) {
      this._authUser.logOut();
    }
  }
  
  
  searchKey:string ='';
  bookSearch = [];
  close:Boolean = false;
  search(){
    this.close=false
    if (this.searchKey.length > 2) {
      this._CBAService.getCBA('book', 1, 5, `&key=${this.searchKey}`).subscribe((res)=>{
        this.bookSearch = res.body.books.docs;
      })   
    }else{
      this.bookSearch = []
    }
  }
  closeRes(){
    this.close= true
  }
}
