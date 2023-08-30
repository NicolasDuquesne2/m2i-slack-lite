import { Channel } from './channel';
import { User } from './user';

export interface Post {
  id: number;
  text: string;
  createdDateTime: Date;
  updatedDateTime: Date;
  user: User;
  channel: Channel;
}
