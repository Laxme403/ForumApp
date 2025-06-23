import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from '../../components/user-register/user-register.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, UserRegisterComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showRegister = false;
  registerSuccess = false;

  constructor(private router: Router) {}

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
}
