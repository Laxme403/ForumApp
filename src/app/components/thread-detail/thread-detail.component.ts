import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ThreadService } from '../../services/thread.service';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../models/reply.model';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ThreadDetailComponent implements OnInit {
  thread: any;
  replies: Reply[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private replyService: ReplyService,
    private router: Router // Add this
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

    this.replyService.getRepliesByThread(threadId).subscribe({
      next: (replies) => {
        this.replies = replies;
      },
      error: (err) => {
        this.error = 'Failed to load replies';
      }
    });
  }

  isArray(val: any): val is any[] {
    return Array.isArray(val);
  }

  goHome() {
    this.router.navigate(['/thread-list']); // Adjust route if needed
  }
}
