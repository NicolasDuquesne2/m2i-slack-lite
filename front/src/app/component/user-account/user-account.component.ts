import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/interface/user';
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

  formUpdateAvatar: FormGroup;

  isErrorAvatar:boolean = false;
  isDeleteError:boolean = false;

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
}
