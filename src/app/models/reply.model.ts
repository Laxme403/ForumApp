import { PublicUser } from './public-user.model';
import { Thread } from './thread.model';

export interface Reply {
  id?: number;
  content: string;
  authorName?: string;   // username string from DB
  threadId: number;
  userId: number;
}
