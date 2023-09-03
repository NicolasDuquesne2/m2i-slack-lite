import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { UserForm } from 'src/app/interface/user-form';
import { HttpUserService } from 'src/app/service/http-user.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-account-name',
  templateUrl: './user-account-name.component.html',
  styleUrls: ['./user-account-name.component.scss']
})
export class UserAccountNameComponent {
  user: User | undefined;
  userId: number | null = null;

  formUpdateName: FormGroup;

  isErrorName: boolean = false;
  isError: boolean = false;

  isValidName: boolean = false;
  isSuccess: boolean = false;

  constructor(private userService: UserService, private httpUserService: HttpUserService, private formBuilder: FormBuilder) {
    // Form update Name
    this.formUpdateName = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
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

  onUpdateName(){
    // Reset error and validation variable
    this.isErrorName = false;
    this.isValidName = false;
    this.isError = false;
    this.isSuccess = false;

    //Form Validation
    this.formUpdateName.get('name')?.invalid ? this.isErrorName = true : this.isValidName = true;
    if (this.formUpdateName.invalid) return;

    // Creation of the user variable
    const user: UserForm = {
      id: this.userId,
      name: this.formUpdateName.value.name,
      email: null,
      password: null,
      avatar: null
    };

    // API call
    this.httpUserService.partialUpdateUser(user).subscribe({
      next: (data) => {
        if(this.user != undefined && user.name != null) this.user.name = user.name;
        this.userService.setUser(this.user);
        this.isSuccess = true;
        setTimeout(() => {
          this.isValidName = false;
          this.isSuccess = false;
          this.formUpdateName.reset();
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
