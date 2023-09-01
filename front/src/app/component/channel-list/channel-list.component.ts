import { Component, ViewEncapsulation } from '@angular/core';
import { Channel } from 'src/app/interface/channel';
import { HttpChannelService } from 'src/app/service/http-channel.service';

@Component({
  selector: '[app-channel-list]',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChannelListComponent {
  channels: Channel[] = [];
  localError!: Error;

  constructor(private httpChannelService: HttpChannelService) {
    this.httpChannelService.getChannels().subscribe({
      next: (res) => {
        this.channels = res;
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err.message);

        this.localError = err;
      },
    });
  }
}
