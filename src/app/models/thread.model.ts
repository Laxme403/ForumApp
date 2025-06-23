import { Reply } from './reply.model';
import { PublicUser } from './public-user.model';

export interface Thread {
  id: number;
  title: string;
  description: string;
  userId: number;
  author: string;
  likes: number;
  dislikes: number;
  tags: string[]; // Changed to only allow array of strings
  replies: number;
}
