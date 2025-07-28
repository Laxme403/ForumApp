import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread.model';
import { ReactionActionRequest, ReactionActionResponse, ThreadReactionDto, ReactionType } from '../models/reaction.model';

export interface ThreadCreateRequest {
  title: string;
  description: string;
  tags: string;
  author: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  // Set your backend API base URL here:
  private apiUrl = 'http://localhost:5226/api';

  constructor(private http: HttpClient) {}

  getThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/threads`);
  }

  getThreadById(id: number): Observable<Thread> {
    return this.http.get<Thread>(`${this.apiUrl}/threads/${id}`);
  }

  createThread(threadData: ThreadCreateRequest): Observable<Thread> {
    return this.http.post<Thread>(`${this.apiUrl}/threads`, threadData);
  }

  softDeleteThread(threadId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/threads/${threadId}/soft-delete`, { deleteindex: 1 });
  }

  // New unified reaction methods
  reactToThread(threadId: number, userId: number, reactionType: ReactionType): Observable<ReactionActionResponse> {
    const request: ReactionActionRequest = { userId, reactionType };
    return this.http.post<ReactionActionResponse>(`${this.apiUrl}/threads/${threadId}/react`, request);
  }

  getUserReaction(threadId: number, userId: number): Observable<ThreadReactionDto | null> {
    return this.http.get<ThreadReactionDto | null>(`${this.apiUrl}/threads/${threadId}/user-reaction/${userId}`);
  }

  getThreadsReactedByUser(userId: number, reactionType?: ReactionType): Observable<Thread[]> {
    const url = reactionType !== undefined 
      ? `${this.apiUrl}/threads/reacted/${userId}?reactionType=${reactionType}`
      : `${this.apiUrl}/threads/reacted/${userId}`;
    return this.http.get<Thread[]>(url);
  }
}
