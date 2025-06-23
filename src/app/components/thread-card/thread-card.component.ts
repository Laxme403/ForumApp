import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Thread } from '../../models/thread.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Submodels to match backend


@Component({
  selector: 'app-thread-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss']
})
export class ThreadCardComponent {
  @Input() thread!: Thread;
  @Output() titleClick = new EventEmitter<Event>();
  @Output() requestRegister = new EventEmitter<void>();

  showReplyBox = false;
  replyText = '';

  likeStatus: 'like' | 'dislike' | null = null; // Track current user's action
  expanded = false; // <-- Add this line

  constructor(private http: HttpClient) {}

  onTitleClick(event: Event): void {
    event.preventDefault();
    this.titleClick.emit(event);
  }

  getPreview(text: string): string {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
    return sentences.slice(0, 2).join(' ');
  }

  onLike() {
    const userId = localStorage.getItem('userId');
    if (!userId || userId === '0') {
      this.requestRegister.emit();
      return;
    }

    // UI logic for toggling like/dislike
    if (this.likeStatus === 'like') {
      this.thread.likes--;
      this.likeStatus = null;
    } else {
      if (this.likeStatus === 'dislike') {
        this.thread.dislikes--;
      }
      this.thread.likes++;
      this.likeStatus = 'like';
    }

    // Call backend to persist like
    this.http.post(`http://localhost:5226/api/threads/${this.thread.id}/like`, {})
      .subscribe();
  }

  onDislike() {
    const userId = localStorage.getItem('userId');
    if (!userId || userId === '0') {
      this.requestRegister.emit();
      return;
    }

    // UI logic for toggling like/dislike
    if (this.likeStatus === 'dislike') {
      this.thread.dislikes--;
      this.likeStatus = null;
    } else {
      if (this.likeStatus === 'like') {
        this.thread.likes--;
      }
      this.thread.dislikes++;
      this.likeStatus = 'dislike';
    }

    // Call backend to persist dislike
    this.http.post(`http://localhost:5226/api/threads/${this.thread.id}/dislike`, {})
      .subscribe();
  }

  onReply(): void {
    this.showReplyBox = !this.showReplyBox;
  }

  submitReply(): void {
    if (this.replyText.trim()) {
      console.log(`Reply submitted to thread ID: ${this.thread.id} - ${this.replyText}`);
      // Here you'd typically emit an event or call a service to actually post the reply.
    } else {
      console.log(`Reply box closed without input for thread ID: ${this.thread.id}`);
    }

    this.replyText = '';
    this.showReplyBox = false;
  }

  // Add this method to your component class
  isArray(val: any): val is any[] {
    return Array.isArray(val);
  }
}