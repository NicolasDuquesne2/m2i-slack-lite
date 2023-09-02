import { Color } from '../enum/color';
import { UserId } from './user-id';

export interface ChannelForm {
  id: number | null;
  name: string | null;
  color: Color | null;
  deletable: boolean | null;
  user: UserId | null;
}
