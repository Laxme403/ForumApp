import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Thread } from '../../models/thread.model';
import { ThreadService } from '../../services/thread.service';
import { AdminThreadCardComponent } from '../admin-thread-card/admin-thread-card.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { TagModalComponent } from '../tag-modal/tag-modal.component'; // <-- Add this import

@Component({
  selector: 'app-admin-thread-list',
  standalone: true,
  imports: [
    CommonModule,
    AdminThreadCardComponent,
    SidebarComponent,
    TagModalComponent // <-- Add this here
  ],
  templateUrl: './admin-thread-list.component.html',
  styleUrls: ['./admin-thread-list.component.scss']
})
export class AdminThreadListComponent implements OnInit {
  threads: Thread[] = [];

  showTagModal = false;

  allTags = [
    { name: 'Frontend', description: 'User-facing part of a website or app.' },
    { name: '.NET', description: 'Microsoft’s framework for building apps.' },
    { name: 'Angular', description: 'Framework for building web apps.' },
    { name: 'SQL', description: 'Language to manage database data.' },
    { name: 'Database', description: 'Stores and organizes data.' },
    { name: 'C#', description: 'Programming language by Microsoft.' }
  ];

  constructor(private threadService: ThreadService, private router: Router) {}

  ngOnInit() {
    this.fetchThreads();
  }

  fetchThreads() {
    this.threadService.getThreads().subscribe((data) => {
      this.threads = data
        .filter(thread => thread.deleteindex === 0)
        .map(thread => {
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
    this.threadService.softDeleteThread(threadId).subscribe(() => {
      this.threads = this.threads.filter(thread => thread.id !== threadId);
    });
  }

  onQuestionsClick() {
    this.showTagModal = true;
  }

  onTagSelected(tagName: string) {
    this.showTagModal = false;
    this.router.navigate(['/'], { queryParams: { tag: tagName } });
  }

  onHomeClick() {
    this.router.navigate(['/']);
  }
}
