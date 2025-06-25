import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Thread } from '../../models/thread.model';

@Component({
  selector: 'app-user-replies-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-replies-modal.component.html',
  styleUrls: ['./user-replies-modal.component.scss']
})
export class UserRepliesModalComponent {
  @Input() threads: Thread[] = [];
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  goToThread(threadId: number, event: Event) {
    event.stopPropagation();
    this.close.emit();
    this.router.navigate(['/thread', threadId]);
  }
}