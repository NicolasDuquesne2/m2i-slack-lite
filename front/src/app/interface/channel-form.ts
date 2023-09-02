import { Color } from '../enum/color';
import { User } from './user';

export interface ChannelForm {
  id: number | null;
  name: string | null;
  color: Color | null;
  deletable: boolean | null;
  user: tinyUser | null;
}

interface tinyUser {
  id: number;
}
