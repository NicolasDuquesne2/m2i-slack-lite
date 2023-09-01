import { Component, OnInit } from '@angular/core';
import { ChannelService } from 'src/app/service/channel.service';
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
    private userService: UserService,
    private channelService: ChannelService
  ) {
    this.channelService.newChannel.subscribe((observer) => {
      this.hasNewChannel = observer;
    });

    this.userService.isLogged.subscribe((observer) => {
      this.isLogged = observer;
    });
  }
}
