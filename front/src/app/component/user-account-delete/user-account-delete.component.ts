import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { HttpUserService } from 'src/app/service/http-user.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-account-delete',
  templateUrl: './user-account-delete.component.html',
  styleUrls: ['./user-account-delete.component.scss']
})
export class UserAccountDeleteComponent {
  user: User | undefined;
  userId: number | null = null;

  isDeleteError: boolean = false;
  displayModal: boolean = false;
  isValid: boolean = false;

  constructor(private userService: UserService, private httpUserService: HttpUserService, private router: Router) { }

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

  onDisplayModal() {
    this.displayModal = true;
    this.isDeleteError = false;
  }

  onCloseModal(event: Event) {
    event.stopPropagation();
    this.displayModal = false;
  }

  onDeleteUser(event: Event) {
    event.stopPropagation();
    if (this.userId == null) return;

    this.httpUserService.deleteUserById(this.userId).subscribe({
      next: (data) => {
        this.isValid = true;
        setTimeout(() => {
          this.isValid = false;
          this.userService.setIsLogged(false);
          this.userService.setUserId(null);
          this.userService.setUser(undefined);
          localStorage.clear();
          this.router.navigate(['']);
        }, 1500)
      },
      error: (err) => {
        this.isDeleteError = true;

        setTimeout(() => {
          this.isDeleteError = false;
        }, 1500);
      },
    });
  }
}
