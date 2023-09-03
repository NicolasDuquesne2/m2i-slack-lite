import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { UserForm } from 'src/app/interface/user-form';
import { HttpUserService } from 'src/app/service/http-user.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-account-password',
  templateUrl: './user-account-password.component.html',
  styleUrls: ['./user-account-password.component.scss']
})
export class UserAccountPasswordComponent {
  user: User | undefined;
  userId: number | null = null;

  formUpdatePassword: FormGroup;

  isErrorPassword: boolean = false;
  isErrorPasswordConfirm: boolean = false;
  isError: boolean = false;

  isValidPassword: boolean = false;
  isValidPasswordConfirm: boolean = false;
  isSuccess: boolean = false;


  constructor(private userService: UserService, private httpUserService: HttpUserService, private formBuilder: FormBuilder) {
    // Form update Password
    this.formUpdatePassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_+=\-()[\]{}|\\:;"'<>,.?/~])[A-Za-z\d@$!%*?&^#_+=\-()[\]{}|\\:;"'<>,.?/~]{8,}$/)]],
      passwordConfirm: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userService.userId.subscribe((observer) => {
      this.userId = observer;
    });

    this.userService.user.subscribe((observer) => {
      this.user = observer;
    });

    if (this.userId != null) {
      this.httpUserService.getUserById(this.userId).subscribe({
        next: (res: User) => {
          this.userService.setUser(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  // Form Update password
  onUpdatePassword() {
    // Reset error and validation variable
    this.isErrorPassword = false;
    this.isErrorPasswordConfirm = false;
    this.isValidPassword = false;
    this.isValidPasswordConfirm = false;
    this.isError = false;
    this.isSuccess = false;

    //Form Validation
    this.formUpdatePassword.get('password')?.invalid ? this.isErrorPassword = true : this.isValidPassword = true;
    if (this.formUpdatePassword.get('passwordConfirm')?.invalid) {
      this.isErrorPasswordConfirm = true;
    } else {
      if (this.formUpdatePassword.value.password !== this.formUpdatePassword.value.passwordConfirm) {
        this.isErrorPasswordConfirm = true;
        return;
      }
      this.isValidPasswordConfirm = true;
    }
    if (this.formUpdatePassword.invalid) return;

    // Creation of the user variable
    const user: UserForm = {
      id: this.userId,
      name: null,
      email: null,
      password: this.formUpdatePassword.value.password,
      avatar: null
    };

    // API call
    this.httpUserService.partialUpdateUser(user).subscribe({
      next: (data) => {
        this.isSuccess = true;
        setTimeout(() => {
          this.isValidPassword = false;
          this.isValidPasswordConfirm = false;
          this.isSuccess = false;
          this.formUpdatePassword.reset();
        }, 1500)

      },
      error: (err) => {
        //console.error(err);
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 1500);
      }
    });
  }
}
