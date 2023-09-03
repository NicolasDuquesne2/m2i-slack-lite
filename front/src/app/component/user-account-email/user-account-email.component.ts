import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { UserForm } from 'src/app/interface/user-form';
import { HttpUserService } from 'src/app/service/http-user.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-account-email',
  templateUrl: './user-account-email.component.html',
  styleUrls: ['./user-account-email.component.scss']
})
export class UserAccountEmailComponent {
  user: User | undefined;
  userId: number | null = null;
  formUpdateEmail: FormGroup;

  isErrorEmail: boolean = false;
  isValidEmail: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;
  errorMessageEmail: string = 'Email invalide';

  constructor(private userService: UserService, private httpUserService: HttpUserService, private formBuilder: FormBuilder) {
    // Form update Email
    this.formUpdateEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
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
    this.isError = false;
    this.isSuccess = false;
    this.errorMessageEmail = 'Email invalide';

    //Form Validation
    if (this.formUpdateEmail.get('email')?.invalid) this.isErrorEmail = true;
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
        this.isSuccess = true;
        setTimeout(() => {
          this.isValidEmail = false;
          this.isSuccess = false;
          this.formUpdateEmail.reset();
        }, 1500)

      },
      error: (err) => {
        //console.error(err);
        if (err.error.error != null && err.error.error == 'The given email is already used') {
          this.isErrorEmail = true;
          this.errorMessageEmail = 'Un utilisateur utilise déjà cet email';
        } else {
          this.isError = true;
        }
        setTimeout(() => {
          this.isError = false;
        }, 1500);
      }
    });
  }
}
