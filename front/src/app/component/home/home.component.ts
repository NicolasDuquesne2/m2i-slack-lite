import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLogged: boolean = false;

  constructor(private userService: UserService){ 
    this.userService.isLogged.subscribe((observer)=>{
      this.isLogged = observer;
    });
  }
}
