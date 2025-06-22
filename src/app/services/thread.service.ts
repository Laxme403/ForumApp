import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread.model';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private apiUrl = 'http://localhost:5226/api/threads';

  constructor(private http: HttpClient) {}

  getThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(this.apiUrl);
  }

  getThreadById(id: number): Observable<Thread> {
    return this.http.get<Thread>(`${this.apiUrl}/${id}`);
  }

  createThread(thread: Thread): Observable<Thread> {
    return this.http.post<Thread>(this.apiUrl, thread);
  }

  updateThread(id: number, thread: Thread): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, thread);
  }

  deleteThread(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
