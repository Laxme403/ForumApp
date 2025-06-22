// src/app/shared/thread.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Thread } from './thread.model';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private threads: Thread[] = [
    {
      id: 1,
      title: 'Example Thread Title 1',
      author: 'Alice',
      likes: 12,
      dislikes: 3,
      replies: 2,
      description: 'This is a detailed description of thread 1.',
      tags: ['Angular', 'Help'],
      repliesList: [
        { author: 'Bob', text: 'Thanks for this!' },
        { author: 'Charlie', text: 'I have the same question.' },
      ],
    },
    {
      id: 2,
      title: 'Second Thread Title',
      author: 'David',
      likes: 8,
      dislikes: 1,
      replies: 0,
      description: 'Second thread description here.',
      tags: ['HTML', 'CSS'],
      repliesList: [],
    },
    {
      id: 3,
      title: 'Third Thread Title',
      author: 'Eve',
      likes: 5,
      dislikes: 0,
      replies: 1,
      description: 'Third thread description.',
      tags: ['TypeScript', 'Routing'],
      repliesList: [{ author: 'Frank', text: 'Useful info, thanks!' }],
    },
  ];

  // BehaviorSubject holds the current state of threads
  private threadsSubject = new BehaviorSubject<Thread[]>(this.threads);

  // Observable for components to subscribe to thread list updates
  threads$: Observable<Thread[]> = this.threadsSubject.asObservable();

  getThreads(): Thread[] {
    // Return a copy to avoid direct mutation
    return [...this.threads];
  }

  getThreadById(id: number): Thread | undefined {
    return this.threads.find((thread) => thread.id === id);
  }

  likeThread(id: number): void {
    const thread = this.getThreadById(id);
    if (thread) {
      thread.likes++;
      this.emitChanges();
    }
  }

  dislikeThread(id: number): void {
    const thread = this.getThreadById(id);
    if (thread) {
      thread.dislikes++;
      this.emitChanges();
    }
  }

  addReply(id: number, reply: { author: string; text: string }): void {
    const thread = this.getThreadById(id);
    if (thread) {
      thread.repliesList.push(reply);
      thread.replies++;
      this.emitChanges();
    }
  }

  private emitChanges(): void {
    // Emit a new copy of threads array to update subscribers
    this.threadsSubject.next([...this.threads]);
  }
}
