import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Thread } from '../../models/thread.model';
// Submodels to match backend


@Component({
  selector: 'app-thread-card',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.scss']
})
export class ThreadCardComponent {
  @Input() thread!: Thread;
  @Output() titleClick = new EventEmitter<Event>();

  showReplyBox = false;
  replyText = '';

  onTitleClick(event: Event): void {
    event.preventDefault();
    this.titleClick.emit(event);
  }

  getPreview(text: string): string {
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
    return sentences.slice(0, 2).join(' ');
  }

  onLike(): void {
    console.log(`Liked thread ID: ${this.thread.id}`);
  }

  onDislike(): void {
    console.log(`Disliked thread ID: ${this.thread.id}`);
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
