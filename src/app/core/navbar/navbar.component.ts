import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from '../../components/user-register/user-register.component';
import { ThreadService } from '../../services/thread.service';
import { Thread } from '../../models/thread.model';
import { UserLoginComponent } from '../../components/user-login/user-login.component';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router, private threadService: ThreadService) {}

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

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
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
    localStorage.setItem('userId', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('userEmail', user.email);
    this.showLogin = false;
    window.location.reload();
  }

  get registeredEmail(): string | null {
    return localStorage.getItem('userEmail');
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
