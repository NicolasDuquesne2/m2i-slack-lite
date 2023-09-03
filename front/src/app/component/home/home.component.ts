import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLogged: boolean = false;
  hasNewChannel: boolean = true;

  constructor(
    private userService: UserService
  ) {
    this.userService.isLogged.subscribe((observer) => {
      this.isLogged = observer;
    });

    if(localStorage.length != 0 && localStorage.getItem('user')){
      let localStorageUser = localStorage.getItem('user');
      if(localStorageUser != null){
        const userId:number = JSON.parse(localStorageUser).userId;
        this.userService.setIsLogged(true);
        this.userService.setUserId(userId);
      }
    }
  }
}
