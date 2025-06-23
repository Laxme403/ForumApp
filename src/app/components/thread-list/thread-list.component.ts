import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThreadCardComponent } from '../../components/thread-card/thread-card.component';
import { Thread } from '../../models/thread.model';
import { ThreadService } from '../../services/thread.service';
import { ThreadCreateComponent } from '../thread-create/thread-create.component'; 
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-thread-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ThreadCardComponent,
    ThreadCreateComponent,
    UserRegisterComponent
  ],
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {
  threads: Thread[] = [];
  searchTerm = '';
  showFilterDropdown = false;

  allTags: string[] = [];
  selectedTags: Set<string> = new Set();

  showThreadCreateModal = false;
  showUserRegisterModal = false;

  constructor(private threadService: ThreadService) {}

  fetchThreads() {
    this.threadService.getThreads().subscribe((data) => {
      this.threads = data.map(thread => ({
        ...thread,
      }));

      const tagSet = new Set<string>();
      this.threads.forEach(thread => {
        (thread.tags as string[]).forEach(tag => tagSet.add(tag));
      });
      this.allTags = Array.from(tagSet).sort();
    });
  }

  ngOnInit(): void {
    this.fetchThreads();
  }

  toggleTagFilter(tag: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTags.add(tag);
    } else {
      this.selectedTags.delete(tag);
    }
  }

  get filteredThreads() {
    let filtered = this.threads;

    // Filter by selected tags if any tags are selected
    if (this.selectedTags.size > 0) {
      filtered = filtered.filter(thread =>
        Array.isArray(thread.tags) &&
        thread.tags.some(tag => this.selectedTags.has(tag))
      );
    }

    // Filter by search term (only thread titles)
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(thread =>
        thread.title.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  toggleFilterDropdown(): void {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  onAskQuestion(): void {
    alert('Ask Question clicked!');
    // TODO: Replace with actual navigation or modal logic
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
}

