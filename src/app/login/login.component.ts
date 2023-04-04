import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Authadminservice } from '../auth-admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private _authAdmin:Authadminservice, private _router:Router){}

    adminloginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
    })

    submitRegisterForm(adminloginForm:FormGroup) {
      this._authAdmin.loginAdmin(adminloginForm.value).subscribe((res) => {
        if(res.token){
          localStorage.setItem('adminToken',res.token);
          this._authAdmin.saveCurrentAdmin();
          this._router.navigate(['admin/categories']);
        }
        else{
            //throw error
        }
      })
    }

}
