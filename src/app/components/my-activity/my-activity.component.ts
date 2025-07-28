import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { Router } from '@angular/router';
import { Thread } from '../../models/thread.model';
import { ThreadService } from '../../services/thread.service';
import { Reply } from '../../models/reply.model';
import { ReplyService } from '../../services/reply.service';
import { AuthService } from '../../services/auth.service';
import { ReactionType } from '../../models/reaction.model';

@Component({
  selector: 'app-my-activity',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TagModalComponent],
  templateUrl: './my-activity.component.html',
  styleUrls: ['./my-activity.component.scss']
})
export class MyActivityComponent implements OnInit {
  showTagModal = false;
  threads: Thread[] = [];
  replies: Reply[] = [];
  threadsUserLiked: Thread[] = [];
  threadsUserDisliked: Thread[] = [];

  constructor(
    public router: Router,
    private threadService: ThreadService,
    private replyService: ReplyService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.threadService.getThreads().subscribe((data: Thread[]) => {
      this.threads = data;
    });
    this.replyService.getReplies().subscribe((data: Reply[]) => {
      this.replies = data;
    });
    
    this.threadService.getThreadsReactedByUser(currentUser.id, ReactionType.Like).subscribe((threads: Thread[]) => {
      this.threadsUserLiked = threads;
    });
    this.threadService.getThreadsReactedByUser(currentUser.id, ReactionType.Dislike).subscribe((threads: Thread[]) => {
      this.threadsUserDisliked = threads;
    });
  }

  onQuestionsClick() {
    this.showTagModal = true;
  }

  allTags = [
    { name: 'Frontend', description: 'User-facing part of a website or app.' },
    { name: '.NET', description: 'Microsoft’s framework for building apps.' },
    { name: 'Angular', description: 'Framework for building web apps.' },
    { name: 'SQL', description: 'Language to manage database data.' },
    { name: 'Database', description: 'Stores and organizes data.' },
    { name: 'C#', description: 'Programming language by Microsoft.' }
  ];

  onTagSelected(tagName: string) {
    this.showTagModal = false;
    // Redirect to thread list with tag as query param
    this.router.navigate(['/'], { queryParams: { tag: tagName } });
  }

  get userThreads(): Thread[] {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return [];
    return this.threads.filter(thread => thread.author === currentUser.username);
  }

  get threadsUserRepliedTo(): Thread[] {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return [];
    
    const repliedThreadIds = this.replies
      .filter(reply => reply.userId === currentUser.id)
      .map(reply => reply.threadId);

    const uniqueThreadIds = Array.from(new Set(repliedThreadIds));
    const result = this.threads.filter(thread => uniqueThreadIds.includes(thread.id));
    console.log('threadsUserRepliedTo:', result);
    return result;
  }
}