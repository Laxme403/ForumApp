import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { Router } from '@angular/router';
import { Thread } from '../../models/thread.model';
import { ThreadService } from '../../services/thread.service';

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

  constructor(public router: Router, private threadService: ThreadService) {}

  ngOnInit() {
    this.threadService.getThreads().subscribe((data: Thread[]) => {
      this.threads = data;
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
    const username = localStorage.getItem('username');
    return this.threads.filter(thread => thread.author === username);
  }
}
