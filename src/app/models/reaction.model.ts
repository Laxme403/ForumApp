export interface ReactionActionRequest {
  userId: number;
  reactionType: ReactionType;
}

export interface ReactionActionResponse {
  likes: number;
  dislikes: number;
  userHasLiked: boolean;
  userHasDisliked: boolean;
  action: string;
}

export interface ThreadReactionDto {
  id: number;
  userId: number;
  threadId: number;
  username?: string;
  reactionType: ReactionType;
  createdAt: Date;
}

export enum ReactionType {
  Like = 1,
  Dislike = 2
}
