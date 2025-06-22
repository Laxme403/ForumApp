import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThreadCardComponent } from '../../components/thread-card/thread-card.component'; // adjust path if needed
import { Thread} from '../../models/thread.model'; // import your shared Thread model
import { User } from '../../models/user.model'; 
@Component({
  selector: 'app-thread-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ThreadCardComponent],
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit {
  threads: Thread[] = [];
  searchTerm = '';
  showFilterDropdown = false;

  allTags: string[] = [];
  selectedTags: Set<string> = new Set();

  ngOnInit(): void {
    this.threads = [
      {
        id: 1,
        title: 'How to learn Angular?',
        author: { id: 1, username: 'Alice', email: 'alice@example.com' },
        replies: [
          // example replies, you can keep empty or add sample reply objects
          // { id: 1, content: 'Great question!', author: { id: 2, username: 'Bob', email: 'bob@example.com' }, threadId: 1 }
        ],
        tags: ['Angular', 'Frontend'],
        description: `Angular is a powerful framework for building web apps. Start with the official docs and try building simple components. Practice routing, services, and modular design.`,
        likes: 20,
        dislikes: 3
      },
      {
        id: 2,
        title: 'Best C# practices',
        author: { id: 2, username: 'Bob', email: 'bob@example.com' },
        replies: [],
        tags: ['C#', '.NET'],
        description: `Use meaningful naming conventions and follow SOLID principles. Leverage features like LINQ and async/await. Proper exception handling is crucial.`,
        likes: 15,
        dislikes: 1
      },
      {
        id: 3,
        title: 'Help with SQL queries',
        author: { id: 3, username: 'Charlie', email: 'charlie@example.com' },
        replies: [],
        tags: ['SQL', 'Database'],
        description: `Start by understanding SELECT, JOIN, and WHERE clauses. Optimize your queries with indexes. Avoid SELECT * in production environments.`,
        likes: 10,
        dislikes: 2
      }
    ];

    const tagSet = new Set<string>();
    this.threads.forEach(thread => {
      thread.tags.forEach(tag => tagSet.add(tag));
    });
    this.allTags = Array.from(tagSet).sort();
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
        thread.author.username.toLowerCase().includes(term);

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
}
