import { Component } from '@angular/core';
import { Authadminservice } from '../../services/auth-admin.service';
import { CBAService } from 'src/app/services/cba.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  adminIsLogin:boolean = false;

  constructor(private _authAdmin:Authadminservice, private _CBAService:CBAService){
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


  searchKey:string ='';
  bookSearch = [];
  close:Boolean = false;
  search(){
    this.close=false
    if (this.searchKey.length > 2) {
      this._CBAService.getCBA('book', 1, 5, this.searchKey).subscribe((res)=>{
        this.bookSearch = res.books.docs;
      })   
    }else{
      this.bookSearch = []
    }
  }
  closeRes(){
    this.close= true
  }
}
