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
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.threadId = idParam ? Number(idParam) : NaN;

      if (isNaN(this.threadId)) {
        this.error = 'Invalid thread ID';
        this.thread = null;
        return;
      }

      this.fetchThread();
    });
  }

  fetchThread(): void {
    this.loading = true;
    this.error = '';
    this.thread = null;

    this.threadService.getThreadById(this.threadId).subscribe({
      next: (data) => {
        if (data) {
          this.thread = data;
        } else {
          this.error = 'Thread not found';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load thread details';
        this.loading = false;
        console.error('Thread fetch error:', err);
      }
    });
  }

  // Add this method to your component class
  isArray(val: any): val is any[] {
    return Array.isArray(val);
  }
}
