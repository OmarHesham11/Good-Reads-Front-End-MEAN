import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Authadminservice } from '../../services/auth-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthuserService } from 'src/app/services/authuser.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    route:string = ''; 
    email:string;
    header:string;
    constructor(private _authAdmin:Authadminservice, private _router:Router, private _activatedRoute:ActivatedRoute, private _authUser:AuthuserService){
        this.route = this._activatedRoute.snapshot.routeConfig.path;
        console.log(this.route);
        if(this.route == 'admin/login'){
          this.email = 'Admin name';
          this.header = 'Welcome To Admin Panel';
        }
        else if(this.route == 'user/login')
        {
          this.email = 'User Name';
          this.header ='Sign in to Goodreads';
        }
    }


    loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
    })

    submitLoginForm(loginForm:FormGroup) {
      if(this.route == 'admin/login'){
        this._authAdmin.loginAdmin(loginForm.value).subscribe((res) => {
          if(res.token){
            localStorage.setItem('adminToken',res.token);
            this._authAdmin.saveCurrentAdmin();
            this._router.navigate(['admin/categories']);
          }
          else{
              //throw error
          }
        })
      }else if (this.route == 'user/login'){
        this._authUser.loginUser(loginForm.value).subscribe({
          next: (res) => {
            localStorage.setItem('userToken',res.token),
            this._authUser.saveCurrentUser(),
            this._router.navigate(['userhome'])
          },
          error: (err) => console.log('error fe el user login'),
          complete: () => console.info('Complete')
        })
      }
      
    }

}
