import { Reply } from './reply.model';
import { User } from './user.model';

export interface Thread {
  id: number;
  title: string;
  description: string;
  userId: number;
  author: User;        // optional user details
  replies: Reply[];    // optional replies list
  tags: string[];
  likes: number;
  dislikes: number;
}
