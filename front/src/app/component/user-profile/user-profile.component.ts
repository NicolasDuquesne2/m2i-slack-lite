import { Component, ViewEncapsulation } from '@angular/core';
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
  id:number | null = null;

  constructor(private userService: UserService, private httpUserService: HttpUserService) { }

  ngOnInit(): void {
    this.userService.userId.subscribe((observer)=>{
      this.id = observer;
      console.log(`userId observer: ${this.id}`);
    });

    this.userService.user.subscribe((observer)=>{
      this.user = observer;
      console.log(`userId observer: ${this.user}`);
    });

    if(this.id != null) {
      this.httpUserService.getUserById(this.id).subscribe({
        next: (res:User) => {
          console.log(res);
          this.userService.setUser(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  getAvatarSrc():string{
    if(!this.user) return './assets/img/default-user.svg';
    if( this.user.avatar == '') return './assets/img/default-user.svg';
    if( this.user.avatar.toLowerCase() == 'avatar') return './assets/img/avatar.webp';
    if( this.user.avatar.toLowerCase() == 'eldenring' ||  this.user.avatar.toLowerCase() == 'malenia') return './assets/img/malenia.webp';
    if(!this.user.avatar.startsWith('http')) return './assets/img/default-user.svg';
    return  this.user.avatar;
  }
}
