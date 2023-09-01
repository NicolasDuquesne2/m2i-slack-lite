import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  constructor() {}
  private _newChannel = new BehaviorSubject<boolean>(true);
  newChannel = this._newChannel.asObservable();

  setNewChannel(newChannel: boolean) {
    this._newChannel.next(newChannel);
  }
}
