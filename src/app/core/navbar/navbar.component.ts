import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from '../../components/user-register/user-register.component';
import { ThreadService } from '../../services/thread.service';
import { Thread } from '../../models/thread.model';
import { UserLoginComponent } from '../../components/user-login/user-login.component';
import { FormsModule } from '@angular/forms';
import { RoleModalComponent } from '../../components/role-modal/role-modal.component';
import { SearchService } from '../../services/search.service';
import { ThreadListComponent } from '../../components/thread-list/thread-list.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    UserRegisterComponent,
    UserLoginComponent,
    FormsModule,
    RoleModalComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  showRegister = false;
  registerSuccess = false;
  avatarDropdownOpen = false;
  showLogin = false;
  showRoleModal = false;
  searchTerm: string = '';

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    window.addEventListener('click', () => this.avatarDropdownOpen = false);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  openRegister(): void {
    this.showRegister = true;
    this.registerSuccess = false;
    localStorage.setItem('isAdmin', 'false'); // Reset admin flag on register open
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
    localStorage.setItem('isAdmin', 'false'); // Reset admin flag on logout
    window.location.reload();
  }

  goToThread(threadId: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/thread', threadId]);
  }

  openLogin() {
    this.showLogin = true;
    localStorage.setItem('isAdmin', 'false'); // Reset admin flag on login open
  }
  closeLogin() {
    this.showLogin = false;
  }

  onLoginSuccess(user: any) {
    localStorage.setItem('userId', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('userEmail', user.email);
    this.showLogin = false;      // Hide login modal
    this.showRoleModal = true;   // Show role modal
  }

  get registeredEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

@Output() onearch = new EventEmitter<string>();
onSearch() {
  this.search.emit(this.searchTerm);
  this.searchService.updateSearchTerm(this.searchTerm);
  this.router.navigate(['/']);
}

  onAuthSuccess() {
    this.showLogin = false;      // Close login modal
    this.showRegister = false;   // Close register modal (if open)
    this.showRoleModal = true;   // Open role modal
  }

  onRoleSelected(role: string) {
    localStorage.setItem('isAdmin', role === 'admin' ? 'true' : 'false');
    this.showRoleModal = false;
  }


}