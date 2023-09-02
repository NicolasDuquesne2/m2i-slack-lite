import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { UserForm } from 'src/app/interface/user-form';
import { HttpUserService } from 'src/app/service/http-user.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
  user: User | undefined;
  userId: number | null = null;
  formUpdateEmail: FormGroup;
  formUpdatePassword: FormGroup;
  formUpdateName: FormGroup;
  formUpdateAvatar: FormGroup;

  isErrorEmail: boolean = false;
  isErrorName: boolean = false;
  isErrorPassword: boolean = false;
  isErrorPasswordConfirm: boolean = false;
  isErrorAvatar:boolean = false;

  isValidEmail: boolean = false;
  isValidName: boolean = false;
  isValidPassword: boolean = false;
  isValidPasswordConfirm: boolean = false;

  errorMessageEmail: string = 'Email invalide';
  
  constructor(private userService: UserService, private httpUserService: HttpUserService, private formBuilder: FormBuilder) {
    // Form update Email
    this.formUpdateEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Form update Password
    this.formUpdatePassword = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_+=\-()[\]{}|\\:;"'<>,.?/~])[A-Za-z\d@$!%*?&^#_+=\-()[\]{}|\\:;"'<>,.?/~]{8,}$/)]],
      passwordConfirm: ['', [Validators.required]]
    });

    // Form update Name
    this.formUpdateName = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });

    //Form update Avatar
    this.formUpdateAvatar = this.formBuilder.group({
      avatar: ['']
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

  // Form Update email
  onUpdateEmail() {
     // Reset error and validation variable
     this.isErrorEmail = false;
     this.isValidEmail = false;
     this.errorMessageEmail = 'Email invalide';

     //Form Validation
     if(this.formUpdateEmail.get('email')?.invalid) this.isErrorEmail = true;
     if (this.formUpdateEmail.invalid) return;

     // Creation of the user variable
    const user: UserForm = {
      id: this.userId,
      name: null,
      email: this.formUpdateEmail.value.email,
      password: null,
      avatar: null
    };

    // API call
    this.httpUserService.partialUpdateUser(user).subscribe({
      next: (data) => {
        this.isValidEmail = true;
        setTimeout(()=>{
          this.isValidEmail = false;
          this.formUpdateEmail.reset();
        }, 1500)

      },
      error: (err) => {
        this.isErrorEmail = true;
        //console.error(err);
        if(err.error.error != null && err.error.error == 'The given email is already used') {
          this.errorMessageEmail = 'Un utilisateur utilise déjà cet email';
        } else {
          this.errorMessageEmail = 'Une erreur est survenue';
        }
      },
    });
  }
}
