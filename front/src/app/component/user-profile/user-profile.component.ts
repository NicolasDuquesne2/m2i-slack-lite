import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { HttpUserService } from 'src/app/service/http-user.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: '[app-user-profile]',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent {
  user: User | undefined;
  userId: number | null = null;

  constructor(private userService: UserService, private httpUserService: HttpUserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.userId.subscribe((observer)=>{
      this.userId = observer;
    });

    this.userService.user.subscribe((observer)=>{
      this.user = observer;
    });

    if(this.userId != null) {
      this.httpUserService.getUserById(this.userId).subscribe({
        next: (res:User) => {
          this.userService.setUser(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  getAvatarSrc(avatar:string):string{
    if(avatar == null || avatar == undefined) return './assets/img/default-user.svg';
    if( avatar == '') return './assets/img/default-user.svg';
    if( avatar.toLowerCase() == 'avatar') return './assets/img/avatar.webp';
    if( avatar.toLowerCase() == 'eldenring' || avatar.toLowerCase() == 'malenia') return './assets/img/malenia.webp';
    if(!avatar.startsWith('http')) return './assets/img/default-user.svg';
    return avatar;
  }

  logout(){
    this.userService.setIsLogged(false);
    this.userService.setUserId(null);
    this.userService.setUser(undefined);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
