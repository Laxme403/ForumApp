import { Thread } from './thread.model';
import { Reply } from './reply.model';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
    // optional user's replies
}
