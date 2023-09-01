import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserForm } from 'src/app/interface/user-form';

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
    // Reset error and validation variables
    this.isError = false;
    this.isErrorEmail = false;
    this.isErrorPassword = false;
    
    // Form validation
    if(this.formLogin.get('email')?.invalid) this.isErrorEmail = true;
    if(this.formLogin.get('password')?.invalid) this.isErrorPassword = true;
    if (this.formLogin.invalid) return;
    
    // Creation of the user variable
    const user: UserForm = {
      id: null,
      name: null,
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
      avatar: null
    };

    // Appel API
    // 
    console.log('account Logged');
    console.log(user);
  }
}
