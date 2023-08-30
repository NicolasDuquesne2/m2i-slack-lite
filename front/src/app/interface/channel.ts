import { Color } from '../enum/color';
import { User } from './user';

export interface Channel {
  id: number;
  name: string;
  deletable: boolean;
  color: Color;
  user: User;
}
