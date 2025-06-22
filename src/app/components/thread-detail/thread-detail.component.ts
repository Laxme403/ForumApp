import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // needed for *ngIf, *ngFor in template
import { ThreadService } from '../../services/thread.service';
import { Thread } from '../../models/thread.model';

@Component({
  selector: 'app-thread-detail',
  standalone: true,
  imports: [CommonModule],  // import CommonModule to support structural directives
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.scss']
})
export class ThreadDetailComponent implements OnInit {
  threadId!: number;
  thread: Thread | null = null;  // thread can be null initially
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.threadId = idParam ? Number(idParam) : NaN;

    if (isNaN(this.threadId)) {
      this.error = 'Invalid thread ID';
      return;
    }

    this.fetchThread();
  }

  fetchThread(): void {
    this.loading = true;
    this.threadService.getThreadById(this.threadId).subscribe({
      next: (data) => {
        this.thread = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load thread details';
        this.loading = false;
        console.error('Thread fetch error:', err);
      }
    });
  }
}
