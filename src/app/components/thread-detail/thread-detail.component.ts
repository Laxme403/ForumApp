import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Add FormsModule for ngModel
import { Router } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component'; // <-- Import SidebarComponent
import { TagModalComponent } from '../tag-modal/tag-modal.component';

import { ThreadService } from '../../services/thread.service';
import { ReplyService, ReplyCreateRequest } from '../../services/reply.service';
import { AuthService } from '../../services/auth.service';
import { Reply } from '../../models/reply.model';

@Component({
  selector: 'app-thread-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, TagModalComponent], // <-- Add FormsModule
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {
  thread: any;
  replies: Reply[] = [];
  loading = true;
  error = '';

  // Reply form properties
  showReplyForm = false;
  newReplyContent = '';
  submittingReply = false;

  showTagModal = false;

  allTags = [
    { name: 'Frontend', description: 'User-facing part of a website or app.' },
    { name: '.NET', description: 'Microsoft’s framework for building apps.' },
    { name: 'Angular', description: 'Framework for building web apps.' },
    { name: 'SQL', description: 'Language to manage database data.' },
    { name: 'Database', description: 'Stores and organizes data.' },
    { name: 'C#', description: 'Programming language by Microsoft.' }
  ];

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private replyService: ReplyService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const threadId = Number(this.route.snapshot.paramMap.get('id'));
    this.threadService.getThreadById(threadId).subscribe({
      next: (thread) => {
        this.thread = thread;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load thread details';
        this.loading = false;
      }
    });

    this.loadReplies(threadId);
  }

  isArray(val: any): val is any[] {
    return Array.isArray(val);
  }

  onQuestionsClick() {
    this.showTagModal = true;
  }

  onTagSelected(tagName: string) {
    this.showTagModal = false;
    // Redirect to thread list with tag as query param
    this.router.navigate(['/'], { queryParams: { tag: tagName } });
  }

  isLoggedInUserAuthor(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return this.thread && currentUser && this.thread.author === currentUser.username;
  }

  onEdit() {
    // Edit logic here
  }

  onDelete() {
    // Delete logic here
  }

  onLike() {
    // Implement like logic here
  }

  onDislike() {
    // Implement dislike logic here
  }

  onReply() {
    // Toggle reply form visibility
    this.showReplyForm = !this.showReplyForm;
    if (this.showReplyForm) {
      this.newReplyContent = ''; // Clear previous content
    }
  }

  onSubmitReply() {
    if (!this.newReplyContent.trim()) {
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.error = 'You must be logged in to reply';
      return;
    }

    this.submittingReply = true;
    const threadId = Number(this.route.snapshot.paramMap.get('id'));
    
    const replyData: ReplyCreateRequest = {
      content: this.newReplyContent.trim(),
      threadId: threadId,
      userId: currentUser.id
    };

    console.log('Submitting reply:', replyData); // Debug log

    this.replyService.createReply(replyData).subscribe({
      next: (reply) => {
        console.log('Reply created successfully:', reply); // Debug log
        // Refresh replies to show the new one
        this.loadReplies(threadId);
        this.newReplyContent = '';
        this.showReplyForm = false;
        this.submittingReply = false;
      },
      error: (err) => {
        console.error('Error creating reply:', err); // Debug log
        this.error = 'Failed to post reply: ' + (err.error?.message || err.message);
        this.submittingReply = false;
      }
    });
  }

  onCancelReply() {
    this.showReplyForm = false;
    this.newReplyContent = '';
  }

  // Extract reply loading into separate method for reuse
  private loadReplies(threadId: number) {
    this.replyService.getRepliesByThread(threadId).subscribe({
      next: (replies) => {
        this.replies = replies;
      },
      error: (err) => {
        this.error = 'Failed to load replies';
      }
    });
  }
}
