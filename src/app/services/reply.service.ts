import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reply } from '../models/reply.model';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  private apiUrl = 'http://localhost:5226/api/replies';

  constructor(private http: HttpClient) {}

  getReplies(): Observable<Reply[]> {
    return this.http.get<Reply[]>(this.apiUrl);
  }

  getRepliesByThread(threadId: number): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${this.apiUrl}/thread/${threadId}`);
  }

  createReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(this.apiUrl, reply);
  }
}
