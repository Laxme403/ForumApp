import { PublicUser } from './public-user.model';
import { Thread } from './thread.model';

export interface Reply {
  id: number;
  content: string;
  authorname: string;   // username string from DB
  threadid: number;
  userid: number;
}
