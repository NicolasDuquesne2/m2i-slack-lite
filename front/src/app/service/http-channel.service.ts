import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../config/config';
import { Observable } from 'rxjs';
import { Channel } from '../interface/channel';
import { ChannelForm } from '../interface/channel-form';

@Injectable({
  providedIn: 'root',
})
export class HttpChannelService {
  constructor(private http: HttpClient) {}

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(`${BASE_URL}/channels`);
  }

  getChanelById(id: number): Observable<Channel> {
    return this.http.get<Channel>(`${BASE_URL}/channels/${id}`);
  }

  createChannel(channelForm: ChannelForm) {
    const body = {
      name: channelForm.name,
      color: channelForm.color,
      deletable: channelForm.deletable,
      user: channelForm.user,
    };

    return this.http.post(`${BASE_URL}/channels`, body);
  }

  partialUpdateChannel(channelForm: ChannelForm) {
    const body = {
      id: channelForm.id,
      name: channelForm.name,
      color: channelForm.color,
    };

    return this.http.patch(`${BASE_URL}/channels/${channelForm.id}`, body);
  }

  deleteChannelById(id: number) {
    return this.http.delete(`${BASE_URL}/channels/${id}`);
  }
}
