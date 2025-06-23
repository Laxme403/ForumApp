import { Reply } from './reply.model';
import { PublicUser } from './public-user.model';

export interface Thread {
  id: number;
  title: string;
  description: string;
  userId: number;
  author: string;        // optional user details
  replies: Reply[]|number;    // optional replies list
  tags: string[];
  likes: number;
  dislikes: number;
}
