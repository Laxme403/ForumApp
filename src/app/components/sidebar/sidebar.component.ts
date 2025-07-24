import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {}

  get isRegistered(): boolean {
    return this.authService.isAuthenticated();
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin(); // Use secure backend-assigned role
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
