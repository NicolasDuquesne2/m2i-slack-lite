import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserForm } from 'src/app/interface/user-form';

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

  constructor(private formBuilder: FormBuilder) {
    this.formSignup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_+=\-()[\]{}|\\:;"'<>,.?/~])[A-Za-z\d@$!%*?&^#_+=\-()[\]{}|\\:;"'<>,.?/~]{8,}$/)]],
      passwordConfirm: ['', [Validators.required]]
    });
  }

  onSignup() {
    // Reset error and validation variables
    this.isError = false;
    this.isErrorEmail = false;
    this.isErrorName = false;
    this.isErrorPassword = false;
    this.isErrorPasswordConfirm = false;
    this.isValidEmail = false;
    this.isValidName = false;
    this.isValidPassword = false;
    this.isValidPasswordConfirm = false;

    // Form validation
    this.formSignup.get('email')?.invalid ? this.isErrorEmail = true : this.isValidEmail = true;
    this.formSignup.get('name')?.invalid ? this.isErrorName = true : this.isValidName = true;
    this.formSignup.get('password')?.invalid ? this.isErrorPassword = true : this.isValidPassword = true;
    
    if(this.formSignup.get('passwordConfirm')?.invalid) {
      this.isErrorPasswordConfirm = true;
    } else{
      if(this.formSignup.value.password !== this.formSignup.value.passwordConfirm){
        this.isErrorPasswordConfirm = true;
        return;
      }
      this.isValidPasswordConfirm = true;    
    } 
    if (this.formSignup.invalid) return;

    // Creation of the user variable
     const user: UserForm = {
       id: null,
       name: this.formSignup.value.name,
       email: this.formSignup.value.email,
       password: this.formSignup.value.password,
       avatar: null
     };

    // Appel API
    //
    console.log('account created');
    console.log(user);
  }
}
