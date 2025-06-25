import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Thread } from '../../models/thread.model';
import { HttpClientModule } from '@angular/common/http';
import { UserRegisterComponent } from '../../components/user-register/user-register.component'; // adjust path as needed
import { Router } from '@angular/router';
import { ReplyService } from '../../services/reply.service'; // adjust path as needed
import { Reply } from '../../models/reply.model';

@Component({
  selector: 'app-thread-card',
  standalone: true,
  imports: [
    UserRegisterComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss'],
})
export class ThreadCardComponent {
  @Input() thread!: Thread;
  @Input() selectedThreadId: number | null = null;
  @Output() requestRegister = new EventEmitter<void>();
  @Output() selectThread = new EventEmitter<number>();

  expanded = false;
  showRegisterModal = false;
  showReplyBox = false;
  replyText = '';

  userVote: 'like' | 'dislike' | null = null;

  constructor(
    private router: Router,
    private replyService: ReplyService
  ) {}

  getPreview(description: string): string {
    return description.length > 100
      ? description.substring(0, 100) + '...'
      : description;
  }

  isArray(val: any): val is any[] {
    return Array.isArray(val);
  }

  onLike() {
    if (this.userVote === 'like') return; // Already liked, do nothing

    if (this.userVote === 'dislike') {
      // Remove previous dislike
      if (typeof this.thread.dislikes === 'number' && this.thread.dislikes > 0) {
        this.thread.dislikes--;
      }
    }

    if (typeof this.thread.likes === 'number') {
      this.thread.likes++;
    } else {
      this.thread.likes = 1;
    }
    this.userVote = 'like';
  }

  onDislike() {
    if (this.userVote === 'dislike') return; // Already disliked, do nothing

    if (this.userVote === 'like') {
      // Remove previous like
      if (typeof this.thread.likes === 'number' && this.thread.likes > 0) {
        this.thread.likes--;
      }
    }

    if (typeof this.thread.dislikes === 'number') {
      this.thread.dislikes++;
    } else {
      this.thread.dislikes = 1;
    }
    this.userVote = 'dislike';
  }

  onReply() {
    this.showReplyBox = true;
    setTimeout(() => {
      const textarea = document.querySelector(
        '.reply-box textarea'
      ) as HTMLTextAreaElement;
      if (textarea) textarea.focus();
    });
  }

  onRegisterSuccess() {
    this.showRegisterModal = false;
    this.showReplyBox = true;
    setTimeout(() => {
      const textarea = document.querySelector(
        '.reply-box textarea'
      ) as HTMLTextAreaElement;
      if (textarea) textarea.focus();
    });
  }

  get isRegistered(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  submitReply() {
    const userId = Number(localStorage.getItem('userId')); // or get from your auth/user service
    const reply: Reply = {
      content: this.replyText,
      threadId: this.thread.id,
      userId: userId
    };

    this.replyService.createReply(reply).subscribe({
      next: (created) => {
        // Optionally update UI, e.g. add to thread.replies
        this.showReplyBox = false;
        this.replyText = '';
      },
      error: (err) => {
        console.error('Failed to post reply', err);
      }
    });
  }

  onCardClick(event: Event) {
    event.stopPropagation();
    this.selectThread.emit(this.thread.id);
  }

  onTitleClick(event: MouseEvent) {
    event.stopPropagation();
    this.selectThread.emit(this.thread.id);
  }
}