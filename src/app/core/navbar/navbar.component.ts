import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from '../../shared/login-modal/login-modal.component'; // adjust path as needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginModalComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showLoginModal = false;

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    if (path === '/login') {
      this.showLoginModal = true;
    } else {
      this.router.navigate([path]);
    }
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
  }
}
