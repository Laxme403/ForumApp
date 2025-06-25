import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-modal',
  templateUrl: './tag-modal.component.html',
  styleUrls: ['./tag-modal.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TagModalComponent implements OnChanges {
  @Input() tags: { name: string, description: string }[] = [];
  @Output() selectTag = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();

  ngOnChanges() {
    console.log('TAGS PASSED TO MODAL:', this.tags);
  }
}