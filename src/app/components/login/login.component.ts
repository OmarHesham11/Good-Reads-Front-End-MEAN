import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    route:string = ''; 
    email:string;
    header:string;
    image:string;
    errors: string = '';

    isLoggedIn:boolean = false;
    isLoading:boolean = false;

    constructor(private _auth:AuthService, private _router:Router, private _activatedRoute:ActivatedRoute){
        this.route = this._activatedRoute.snapshot.routeConfig.path;
        console.log(this.route);
        if(this.route == 'admin/login'){
          this.email = 'Admin Email';
          this.header = 'Welcome To Admin Panel';
          this.image = 'adminlogin.png'
        }
        else if(this.route == 'user/login')
        {
          this.email = 'User Email';
          this.header ='Time to get lost in a book!';
          this.image = 'login-img.png'

        }
    }


    loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
    })

    submitLoginForm(loginForm:FormGroup) {
      if(this.route == 'admin/login'){
        this._auth.loginAdmin(loginForm.value).subscribe({
          next: (res) => {       
          if(res.token){
            localStorage.removeItem('token');
            localStorage.setItem('token',res.token);
            this._auth.saveCurrentUser();
            this._router.navigate(['admin/categories']);
          }
          else{
              //throw error
            this.errors= "Authentication failed"         
          }
        },
        error: (err) => {
          this.errors= err.error.error            
        },
        })
      }else if (this.route == 'user/login'){
        this.isLoading = true;
        this._auth.userLogin(loginForm.value).subscribe({
          next: (res) => {
            localStorage.removeItem('token');
            localStorage.setItem('token',res.token),
            this._auth.saveCurrentUser(),
            this._router.navigate(['user/books'])
            this.isLoggedIn = true;
            this.isLoading = false;
          },
          error: (err) => {
            this.errors= err.error.error            
          },
          complete: () => console.info('Complete')
        })
      }
      
    }

}
