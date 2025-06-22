import { User } from './user.model';
import { Thread } from './thread.model';

export interface Reply {
  id: number;
  content: string;
  threadId: number;
  userId: number;
  author?: User;          // optional
  thread?: Thread;        // optional
}
