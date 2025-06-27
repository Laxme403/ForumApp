import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() questionsClick = new EventEmitter<void>();
  @Output() tagModalClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  get isRegistered(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  goHome() {
    this.router.navigate(['/thread-list']);
  }

  goToMyActivity() {
    this.router.navigate(['/my-activity']);
  }

  onQuestionsClick() {
    this.questionsClick.emit();
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }
}
