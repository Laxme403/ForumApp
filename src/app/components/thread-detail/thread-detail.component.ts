import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { TagModalComponent } from '../tag-modal/tag-modal.component';

import { ThreadService } from '../../services/thread.service';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../models/reply.model';

@Component({
  selector: 'app-thread-detail',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TagModalComponent],
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {
  thread: any;
  replies: Reply[] = [];
  loading = true;
  error = '';

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
    private router: Router
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

  onQuestionsClick() {
    this.showTagModal = true;
  }

  onTagSelected(tagName: string) {
    this.showTagModal = false;
    // Redirect to thread list with tag as query param
    this.router.navigate(['/'], { queryParams: { tag: tagName } });
  }

  onHomeClick() {
    this.router.navigate(['/']);
  }
}
