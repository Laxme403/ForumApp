import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from '../../components/user-register/user-register.component';
import { ThreadService } from '../../services/thread.service'; // Import your service
import { Thread } from '../../models/thread.model'; // Import your model
import { UserThreadsModalComponent } from '../../components/user-threads-modal.component/user-threads-modal.component';
import { UserRepliesModalComponent } from '../../components/user-replies-modal.component/user-replies-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserRegisterComponent,
    UserThreadsModalComponent, // <-- Add this!
    UserRepliesModalComponent // <-- Add this!
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showRegister = false;
  registerSuccess = false;
  showActivityDropdown = false;

  showUserThreadsModal = false; // <-- Add this here
  showUserRepliesModal = false; // <-- Add this here

  allThreads: Thread[] = [];

  constructor(private router: Router, private threadService: ThreadService) {
  
  }

  ngOnInit(): void {
    this.threadService.getThreads().subscribe((threads: Thread[]) => {
      this.allThreads = threads;
      console.log('Fetched threads:', threads);
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  openRegister(): void {
    this.showRegister = true;
    this.registerSuccess = false;
  }

  closeRegister(): void {
    this.showRegister = false;
  }

  onRegisterSuccess(): void {
    this.showRegister = false;
    this.registerSuccess = true;
    setTimeout(() => this.registerSuccess = false, 3000);
  }

  toggleActivityDropdown(event: Event) {
    event.stopPropagation();
    this.showActivityDropdown = !this.showActivityDropdown;
  }

  get isRegistered(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  get userInitial(): string {
    const email = localStorage.getItem('userEmail');
    return email ? email.charAt(0).toUpperCase() : '';
  }

  // Dummy data for demonstration; replace with real data fetching logic
  get userThreads(): Thread[] {
    const username = localStorage.getItem('username');
    if (!username) return [];
    return this.allThreads.filter(thread => thread.author === username);
  }
  get userReplies() {
    // Return replies where reply.userId === currentUserId
    return []; // Replace with actual logic
  }
  get likedThreads() {
    // Return threads liked by user
    return []; // Replace with actual logic
  }
  get dislikedThreads() {
    // Return threads disliked by user
    return []; // Replace with actual logic
  }
  get userRepliedThreads(): Thread[] {
    const username = localStorage.getItem('username');
    if (!username) return [];
    // Assumes each thread has a 'replies' array with a 'username' property
    return this.allThreads.filter(thread =>
      thread.replies && thread.replies.some(reply => reply.authorName=== username)
    );
  }

  onActivityOptionClick(option: string): void {
    if (option === 'threads') {
      this.showUserThreadsModal = true;
    } else if (option === 'replies') {
      this.showUserRepliesModal = true;
    }
    this.showActivityDropdown = false;
  }
}
