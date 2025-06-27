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

  updateThread(id: number, thread: Thread): Observable<any> {
    return this.http.put(`${this.apiUrl}/threads/${id}`, thread);
  }

  deleteThread(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/threads/${id}`);
  }

  softDeleteThread(threadId: number): Observable<any> {
    // Use the correct endpoint for soft delete
    return this.http.put(`${this.apiUrl}/threads/${threadId}/soft-delete`, { deleteindex: 1 });
  }
}
