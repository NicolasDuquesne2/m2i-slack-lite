import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  formSignup: FormGroup;
  isError: boolean = false;
  isErrorEmail: boolean = false;
  isErrorName: boolean = false;
  isErrorPassword: boolean = false;
  isErrorPasswordConfirm: boolean = false;
  
  isValidEmail: boolean = false;
  isValidName: boolean = false;
  isValidPassword: boolean = false;
  isValidPasswordConfirm: boolean = false; 

  constructor(private formBuilder: FormBuilder){
    this.formSignup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSignup(){
    this.isError = false;
    this.isErrorEmail = false;
    this.isErrorName = false;
    this.isErrorPassword = false;
    this.isErrorPasswordConfirm = false;
    this.isValidEmail = false;
    this.isValidName = false;
    this.isValidPassword = false;
    this.isValidPasswordConfirm = false;

    this.formSignup.get('email')?.invalid ? this.isErrorEmail = true : this.isValidEmail = true;
    this.formSignup.get('name')?.invalid ? this.isErrorName = true : this.isValidName = true;
    this.formSignup.get('password')?.invalid ? this.isErrorPassword = true : this.isValidPassword = true;
    this.formSignup.get('passwordConfirm')?.invalid ? this.isErrorPasswordConfirm = true : this.isValidPasswordConfirm;
    if (this.formSignup.invalid) return;

    // Appel API
    console.log('account created');
  }
}
