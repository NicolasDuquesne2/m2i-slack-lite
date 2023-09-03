import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { UserForm } from 'src/app/interface/user-form';
import { HttpUserService } from 'src/app/service/http-user.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-account-avatar',
  templateUrl: './user-account-avatar.component.html',
  styleUrls: ['./user-account-avatar.component.scss']
})
export class UserAccountAvatarComponent {
  user: User | undefined;
  userId: number | null = null;

  formUpdateAvatar: FormGroup;

  isErrorAvatar: boolean = false;
  isError: boolean = false;

  isValidAvatar: boolean = false;
  isSuccess: boolean = false;

  constructor(private userService: UserService, private httpUserService: HttpUserService, private formBuilder: FormBuilder) {
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

  onUpdateAvatar() {
    // Reset error and validation variable
    this.isErrorAvatar = false;
    this.isValidAvatar = false;
    this.isError = false;
    this.isSuccess = false;

    //Form Validation
    let avatar = this.formUpdateAvatar.value.avatar;
    if (avatar == null ||
      avatar == '' ||
      avatar.toLowerCase() == 'avatar' ||
      avatar.toLowerCase() == 'eldenring' ||
      avatar.toLowerCase() == 'malenia') {
      this.isValidAvatar = true;
    } else {
      avatar.startsWith('http') ? this.isValidAvatar = true : this.isErrorAvatar = true;
    }

    if (this.isErrorAvatar) return;

    // Creation of the user variable
    const user: UserForm = {
      id: this.userId,
      name: null,
      email: null,
      password: null,
      avatar: avatar
    };

    // API call
    this.httpUserService.partialUpdateUser(user).subscribe({
      next: (data) => {
        if (this.user != undefined && user.avatar != null) this.user.avatar = user.avatar;
        this.userService.setUser(this.user);
        this.isSuccess = true;
        setTimeout(() => {
          this.isValidAvatar = false;
          this.isSuccess = false;
          this.formUpdateAvatar.reset();
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
