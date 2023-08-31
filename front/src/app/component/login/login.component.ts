import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formLogin: FormGroup;
  isError: boolean = false;
  isErrorEmail: boolean = false;
  isErrorPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, ){
    this.formLogin = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });
  }

  onLogin(){
    this.isError = false;
    this.isErrorEmail = false;
    this.isErrorPassword = false;
    
    if(this.formLogin.get('email')?.invalid) this.isErrorEmail = true;
    if(this.formLogin.get('password')?.invalid) this.isErrorPassword = true;
    if (this.formLogin.invalid) return;
    
    // appel API
    this.isError = false;
    console.log('click');
  }
}
