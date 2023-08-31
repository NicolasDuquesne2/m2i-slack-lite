import { Channel } from './channel';
import { User } from './user';

export interface PostForm {
    id: number | null;
    text: string | null;
    user: User | null;
    channel: Channel | null;
}
