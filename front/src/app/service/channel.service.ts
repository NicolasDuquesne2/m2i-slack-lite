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

  private _channel = new BehaviorSubject<Channel | undefined>(undefined);
  channel = this._channel.asObservable();

  setChannel(channel: Channel) {
    this._channel.next(channel);
  }

  setChannels(channels: Channel[]) {
    this._channels.next(channels);
  }

  addElemeToChannels(channel: Channel) {
    this.channels.pipe(take(1)).subscribe((val) => {
      const newArr = [...val, channel];
      this._channels.next(newArr);
    });
  }
}
