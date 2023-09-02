import { Component, Input } from '@angular/core';
import { Channel } from 'src/app/interface/channel';

@Component({
  selector: 'app-channel-update-form',
  templateUrl: './channel-update-form.component.html',
  styleUrls: ['./channel-update-form.component.scss']
})
export class ChannelUpdateFormComponent {

  @Input()
  channel!:Channel;

  
}
