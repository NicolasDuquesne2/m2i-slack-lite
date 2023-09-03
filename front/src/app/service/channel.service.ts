import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { Channel } from '../interface/channel';
import { Post } from '../interface/post';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor() { }

  private _channels = new BehaviorSubject<Channel[]>([]);
  channels = this._channels.asObservable();

  private _posts = new BehaviorSubject<Post[]>([]);
  posts = this._posts.asObservable();

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

  setPosts(posts: Post[]) {
    this._posts.next(posts);
  }

  addElemeToPosts(post: Post) {
    this.posts.pipe(take(1)).subscribe((val) => {
      const newArr = [...val, post];
      this._posts.next(newArr);
    });
  }
}
