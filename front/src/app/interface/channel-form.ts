import { Color } from '../enum/color';

export interface ChannelForm {
  id: number | null;
  name: string | null;
  color: Color | null;
  deletable: boolean | null;
  user: string | null;
}
