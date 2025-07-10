import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThreadCardComponent } from '../../components/thread-card/thread-card.component';
import { Thread } from '../../models/thread.model';
import { ThreadService } from '../../services/thread.service';
import { ThreadCreateComponent } from '../thread-create/thread-create.component'; 
import { UserRegisterComponent } from '../user-register/user-register.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-thread-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ThreadCardComponent,
    ThreadCreateComponent,
    UserRegisterComponent,
    TagModalComponent,
    SidebarComponent
  ],
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {
  threads: Thread[] = [];

  selectedTags: Set<string> = new Set();

  showThreadCreateModal = false;
  showUserRegisterModal = false;
  showTagModal = false;

  selectedThreadId: number | null = null;

  allTags: { name: string, description: string }[] = [
    { name: 'Frontend', description: 'User-facing part of a website or app.' },
    { name: '.NET', description: 'Microsoft’s framework for building apps.' },
    { name: 'Angular', description: 'Framework for building web apps.' },
    { name: 'SQL', description: 'Language to manage database data.' },
    { name: 'Database', description: 'Stores and organizes data.' },
    { name: 'C#', description: 'Programming language by Microsoft.' }
  ];

  constructor(
    private threadService: ThreadService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  fetchThreads() {
    this.threadService.getThreads().subscribe((data) => {
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

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tag = params['tag'];
      if (tag) {
        this.selectedTags = new Set([tag]);
      }
      this.fetchThreads();
    });
  }

  @Input() searchTerm: string = '';

  get filteredThreads() {
    let filtered = this.threads;

    if (this.selectedTags.size > 0) {
      const selectedTagsLower = Array.from(this.selectedTags, t => t.toLowerCase().trim());
      filtered = filtered.filter(thread => {
        let threadTags: string[] = [];
        if (Array.isArray(thread.tags)) {
          threadTags = thread.tags.map(tag => tag.toLowerCase().trim());
        } else if (typeof thread.tags === 'string') {
          threadTags = (thread.tags as string).split(',').map((t: string) => t.toLowerCase().trim());
        }
        return selectedTagsLower.every(tag => threadTags.includes(tag));
      });
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(thread =>
        thread.title.toLowerCase().includes(term)
      );
    }

    return filtered;
  }


  isArray(val: any): val is any[] {
    return Array.isArray(val);
  }

  openThreadCreate() {
    const userId = localStorage.getItem('userId');
    if (!userId || userId === '0') {
      this.showUserRegisterModal = true;
    } else {
      this.showThreadCreateModal = true;
    }
  }

  closeThreadCreate() {
    this.showThreadCreateModal = false;
  }

  onThreadCreated() {
    this.closeThreadCreate();
    this.fetchThreads();
  }

  closeUserRegisterModal() {
    this.showUserRegisterModal = false;
  }

  get loggedInUsername() {
    return localStorage.getItem('username') || '';
  }

  onSelectThread(threadId: number) {
    this.selectedThreadId = threadId;
  }

  get selectedThread() {
    return this.threads.find(t => t.id === this.selectedThreadId) || null;
  }

  onQuestionsClick() {
    this.showTagModal = true;
  }

  onTagSelected(tagName: string) {
    this.selectedTags = new Set([tagName]);
    this.showTagModal = false;
  }

  onHomeClick() {
    this.selectedTags.clear();
    this.router.navigate(['/']);
    this.fetchThreads();
  }

  get userInitial() {
    const email = localStorage.getItem('userEmail');
    return email ? email.charAt(0).toUpperCase() : '';
  }

  get isRegistered(): boolean {
    return !!localStorage.getItem('userEmail');
  }
}
