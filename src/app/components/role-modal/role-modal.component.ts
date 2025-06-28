import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent {
  @Output() roleSelected = new EventEmitter<string>();

  selectRole(role: string) {
    this.roleSelected.emit(role);
  }
}
