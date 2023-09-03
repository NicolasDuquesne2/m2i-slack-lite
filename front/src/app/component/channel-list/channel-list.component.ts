import { Component, ViewEncapsulation } from '@angular/core';
import { Channel } from 'src/app/interface/channel';
import { ChannelService } from 'src/app/service/channel.service';
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

  constructor(private httpChannelService: HttpChannelService, private channelService: ChannelService) {
    
    this.channelService.channels.subscribe((observer) => {
      this.channels = observer;
    });
    
    this.httpChannelService.getChannels().subscribe({
      next: (res) => {    
        this.channelService.setChannels(res);
      },
      error: (err) => {
        console.error('something wrong occurred: ' + err.message);

        this.localError = err;
      },
    });
  }
}
