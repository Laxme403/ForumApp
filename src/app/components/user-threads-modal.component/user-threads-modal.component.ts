import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Thread } from '../../models/thread.model';

@Component({
  selector: 'app-user-threads-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-threads-modal.component..html', // Use your HTML file here
  styleUrls: ['./user-threads-modal.component.scss'] // If you have a separate SCSS file
})
export class UserThreadsModalComponent implements OnChanges {
  @Input() threads: Thread[] = [];
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('Threads received by modal:', this.threads);
  }

  goToThread(threadId: number, event: Event) {
    event.stopPropagation(); // Prevent modal close
    this.close.emit(); // Optionally close the modal
    this.router.navigate(['/thread', threadId]);
  }
}