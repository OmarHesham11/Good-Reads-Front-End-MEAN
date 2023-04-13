import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CBAService } from 'src/app/services/cba.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  photo:any;

  constructor(private _CBAService:CBAService, private _router:Router){

  }

  registerForm = new FormGroup({
    firstName: new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required ,Validators.pattern('[A-Za-z0-9]{3,20}$')]),
    lastName: new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required ,Validators.pattern('[A-Za-z0-9]{3,20}$')]),
    photo: new FormControl(null,[Validators.required]),
    DOB: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[A-Z][a-z0-9]{5,15}$')]),
    cPassword: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[A-Z][a-z0-9]{5,15}$')]),
  })

  uploadImage(event:any) {
    // console.log("photo", this.photo);
   if(event.target.files.length>0){
     const file = event.target.files[0];
     this.photo = file
     console.log("photo", this.photo);
   }
  }

  submitRegisterForm(registerForm:FormGroup){
    console.log(registerForm);
    console.log(registerForm.value);

    const formData:FormData = new FormData();
    formData.append('firstName', this.registerForm.get('firstName').value);
    formData.append('lastName', this.registerForm.get('lastName').value);
    formData.append('DOB', this.registerForm.get('DOB').value);
    formData.append('email', this.registerForm.get('email').value);
    formData.append('password', this.registerForm.get('password').value);
    formData.append('cPassword', this.registerForm.get('cPassword').value);
    formData.append('photo', this.photo);

    this._CBAService.postUser('user/signUp',formData).subscribe({
        next:(res) => {if(res.status == 201){
          this._router.navigate(['user/login']);
        }},
        error:(err) => alert('error fe el registration bat3t el user'),
        complete: () => console.info('complete')
      })
    }

}
