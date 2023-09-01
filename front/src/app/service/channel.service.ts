import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Channel } from '../interface/channel';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor() {}

  private _channels = new BehaviorSubject<Channel[]>([]);
  channels = this._channels.asObservable();

  setChannels(channels: Channel[]) {
    this._channels.next(channels);
  }

  addElemeToChannels(channel: Channel) {
    this.channels.pipe(take(1)).subscribe(val => {
      console.log(val);
      const newArr = [...val, channel];
      console.log(channel);
      
      console.log(newArr);
      
      this._channels.next(newArr);
    })
  }
}
