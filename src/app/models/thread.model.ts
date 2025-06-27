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
  tags: string[]; // <-- Make sure this is present and typed
  replies: any; // or a more specific type
  deleteindex: number; // 0 = active, 1 = deleted
  createdAt: string; // <-- Added field
}
