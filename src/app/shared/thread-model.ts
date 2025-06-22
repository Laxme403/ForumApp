// src/app/shared/thread.model.ts
export interface Thread {
  id: number;
  title: string;
  author: string;
  likes: number;
  dislikes: number;
  replies: number;
  description: string;
  tags: string[];
  repliesList?: { author: string; text: string }[];
}
