import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  registerForm = new FormGroup({
    first_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required ,Validators.pattern('[A-Za-z0-9]{3,20}$')]),
    last_name: new FormControl(null, [Validators.minLength(3), Validators.maxLength(20), Validators.required ,Validators.pattern('[A-Za-z0-9]{3,20}$')]),
    age: new FormControl(null, [Validators.required ,Validators.pattern('[0-9]{1,2}$'), Validators.minLength(1), Validators.maxLength(2), Validators.max(80)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(15), Validators.pattern('^[A-Z][a-z0-9]{5,15}$')]),
  })

  submitRegisterForm(registerForm:FormGroup){
    console.log(registerForm);
    console.log(registerForm.value);
  }

}
