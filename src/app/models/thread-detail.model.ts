export interface ReplyDetail {
  id: number;
  content: string;
  authorName: string;
}

export interface ThreadDetail {
  id: number;
  title: string;
  description: string;
  authorName: string;
  tags: string[];
  replies: ReplyDetail[];
  likedBy: string[];
  dislikedBy: string[];
}