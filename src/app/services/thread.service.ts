import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread.model';

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

  createThread(thread: Thread): Observable<Thread> {
    return this.http.post<Thread>(`${this.apiUrl}/threads`, thread);
  }

  softDeleteThread(threadId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/threads/${threadId}/soft-delete`, { deleteindex: 1 });
  }

  getThreadsLikedByUser(userId: number): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/threads/liked/${userId}`);
  }

  getThreadsDislikedByUser(userId: number): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.apiUrl}/threads/disliked/${userId}`);
  }

  likeThread(threadId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/threads/${threadId}/like`, { userId });
  }

  dislikeThread(threadId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/threads/${threadId}/dislike`, { userId });
  }
}
