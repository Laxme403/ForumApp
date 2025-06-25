import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from '../../components/user-register/user-register.component';
import { ThreadService } from '../../services/thread.service'; // Import your service
import { Thread } from '../../models/thread.model'; // Import your model
import { UserThreadsModalComponent } from '../../components/user-threads-modal.component/user-threads-modal.component';
import { UserRepliesModalComponent } from '../../components/user-replies-modal.component/user-replies-modal.component';
import { Reply } from '../../models/reply.model'; // Ensure this import exists
import { UserLoginComponent } from '../../components/user-login/user-login.component'; // Adjust path if needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserRegisterComponent,
    UserThreadsModalComponent, // <-- Add this!
    UserRepliesModalComponent, // <-- Add this!
    UserLoginComponent // <-- Add this line
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

  avatarDropdownOpen = false;

  showLogin = false;

  constructor(private router: Router, private threadService: ThreadService) {
  
  }

  ngOnInit(): void {
    this.threadService.getThreads().subscribe((threads: Thread[]) => {
      this.allThreads = threads;
      console.log('Fetched threads:', threads);
    });

    window.addEventListener('click', () => this.avatarDropdownOpen = false);
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

  toggleAvatarDropdown(event: Event) {
    event.stopPropagation();
    this.avatarDropdownOpen = !this.avatarDropdownOpen;
  }

  get isRegistered(): boolean {
    return !!localStorage.getItem('userEmail');
  }

  get userInitial(): string {
    const email = localStorage.getItem('userEmail');
    return email ? email.charAt(0).toUpperCase() : '';
  }

 get userThreads(): Thread[] {
  const username = localStorage.getItem('username');
  if (!username) return [];
  return this.allThreads.filter(thread => thread.author === username);
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
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return [];
    return this.allThreads.filter(thread =>
      thread.replies && (thread.replies as Reply[]).some((reply: Reply) => reply.userId === userId)
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

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    window.location.reload(); // or this.router.navigate(['/']);
  }

  goToThread(threadId: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/thread', threadId]);
  }

  openLogin() {
    this.showLogin = true;
  }
  closeLogin() {
    this.showLogin = false;
  }

  // Called when login is successful
  onLoginSuccess(user: any) {
    // Save user info to localStorage
    localStorage.setItem('userId', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('userEmail', user.email);
    this.showLogin = false;
    // Optionally, trigger UI update or reload
    window.location.reload();
  }
}
