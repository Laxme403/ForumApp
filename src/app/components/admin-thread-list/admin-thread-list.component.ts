import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Thread } from '../../models/thread.model';
import { ThreadService } from '../../services/thread.service';
import { AdminThreadCardComponent } from '../admin-thread-card/admin-thread-card.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-thread-list',
  standalone: true,
  imports: [
    CommonModule,
    AdminThreadCardComponent,
    SidebarComponent
  ],
  templateUrl: './admin-thread-list.component.html',
  styleUrls: ['./admin-thread-list.component.scss']
})
export class AdminThreadListComponent implements OnInit {
  threads: Thread[] = [];

  constructor(private threadService: ThreadService) {}

  ngOnInit() {
    this.fetchThreads();
  }

  fetchThreads() {
    this.threadService.getThreads().subscribe((data) => {
      // Use the same normalization logic as thread-list
      this.threads = data.map(thread => {
        let tags: string[] = [];
        if (Array.isArray(thread.tags)) {
          if (
            thread.tags.length === 1 &&
            typeof thread.tags[0] === 'string' &&
            (thread.tags[0] as string).includes(',')
          ) {
            tags = (thread.tags[0] as string).split(',').map((t: string) => t.trim());
          } else {
            tags = thread.tags.map((t: string) => t.trim());
          }
        } else if (typeof thread.tags === 'string') {
          tags = (thread.tags as string).split(',').map((t: string) => t.trim());
        }
        return {
          ...thread,
          tags
        };
      });
    });
  }

  onDeleteThread(threadId: number) {
    this.threads = this.threads.filter(thread => thread.id !== threadId);
    // Optionally call backend to delete
    // this.threadService.deleteThread(threadId).subscribe();
  }
}
