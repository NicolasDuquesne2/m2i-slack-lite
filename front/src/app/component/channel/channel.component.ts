import { Component } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent {
  posts = ['Ornstein', 'Artorias', 'Malenia'];
  accessToForm: boolean = true;
  isLoading: boolean = false;
}
