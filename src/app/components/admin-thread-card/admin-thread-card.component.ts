import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Thread } from '../../models/thread.model';

@Component({
  selector: 'app-admin-thread-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './admin-thread-card.component.html',
  styleUrls: ['./admin-thread-card.component.scss'],
})
export class AdminThreadCardComponent {
  @Input() thread!: Thread;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.thread.id);
  }
}