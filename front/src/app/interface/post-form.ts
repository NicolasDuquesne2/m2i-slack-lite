import { ChannelId } from './channel-id';
import { UserId } from './user-id';

export interface PostForm {
    id: number | null;
    text: string | null;
    user: UserId | null;
    channel: ChannelId | null;
}
