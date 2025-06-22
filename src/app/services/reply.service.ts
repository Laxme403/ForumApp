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

  getReplyById(id: number): Observable<Reply> {
    return this.http.get<Reply>(`${this.apiUrl}/${id}`);
  }

  getRepliesByThread(threadId: number): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${this.apiUrl}/thread/${threadId}`);
  }

  createReply(reply: Reply): Observable<Reply> {
    return this.http.post<Reply>(this.apiUrl, reply);
  }

  updateReply(id: number, reply: Reply): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reply);
  }

  deleteReply(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
