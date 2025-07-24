import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from '../../components/user-register/user-register.component';
import { ThreadService } from '../../services/thread.service';
import { Thread } from '../../models/thread.model';
import { UserLoginComponent } from '../../components/user-login/user-login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserRegisterComponent,
    UserLoginComponent,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showRegister = false;
  registerSuccess = false;
  avatarDropdownOpen = false;
  showLogin = false;
  allThreads: Thread[] = [];
  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';

  constructor(private router: Router, private threadService: ThreadService, private authService: AuthService) {}

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
    // Role is automatically assigned by backend, so just close modal and show success
    this.showRegister = false;
    this.registerSuccess = true;
    setTimeout(() => this.registerSuccess = false, 3000);
  }

  toggleAvatarDropdown(event: Event) {
    event.stopPropagation();
    this.avatarDropdownOpen = !this.avatarDropdownOpen;
  }

  get isRegistered(): boolean {
    return this.authService.isAuthenticated();
  }

  get userInitial(): string {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : '';
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
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

  onLoginSuccess(user: any) {
    // User data is already stored by AuthService, just close the modal
    this.showLogin = false;      // Hide login modal
    // Role is automatically assigned by backend - no modal needed
  }

  get registeredEmail(): string | null {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.email || null;
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  // Only keep this in the component that renders the thread list (e.g., ThreadListComponent)
  get filteredThreads() {
    let filtered = this.allThreads;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(thread =>
        thread.title.toLowerCase().includes(term)
      );
    }

    // ...any other filtering logic (e.g., tags) can follow here...

    return filtered;
  }
}
