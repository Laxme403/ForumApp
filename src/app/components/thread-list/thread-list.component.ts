import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThreadCardComponent } from '../../components/thread-card/thread-card.component';
import { Thread } from '../../models/thread.model';
import { ThreadService } from '../../services/thread.service';
import { ThreadCreateComponent } from '../thread-create/thread-create.component'; 

@Component({
  selector: 'app-thread-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ThreadCardComponent, ThreadCreateComponent],
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

  constructor(private threadService: ThreadService) {}

  fetchThreads() {
    this.threadService.getThreads().subscribe((data) => {
      this.threads = data;
      const tagSet = new Set<string>();
      this.threads.forEach(thread => {
        thread.tags.forEach(tag => tagSet.add(tag));
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

  get filteredThreads(): Thread[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.threads.filter(thread => {
      const matchesSearch =
        !term ||
        thread.title.toLowerCase().includes(term) ||
        thread.author.toLowerCase().includes(term);

      const matchesTags =
        this.selectedTags.size === 0 ||
        thread.tags.some(tag => this.selectedTags.has(tag));

      return matchesSearch && matchesTags;
    });
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
    this.showThreadCreateModal = true;
  }

  closeThreadCreate() {
    this.showThreadCreateModal = false;
  }

  onThreadCreated() {
    this.closeThreadCreate();
    this.fetchThreads();
  }

  get loggedInUsername() {
    return localStorage.getItem('username') || '';
  }
}
