import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() loggedIn = new EventEmitter<void>();
  loginForm: FormGroup;
  error = '';
  showRoleModal = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .subscribe({
          next: (response) => {
            // Token and user data are automatically stored by AuthService
            this.loginForm.reset();
            this.onLoginSuccess();
          },
          error: (err: any) => {
            this.error = err.error?.message || 'Login failed';
          }
        });
    }
  }

  close() {
    this.closeModal.emit();
  }

  onLoginSuccess() {
    this.loggedIn.emit();
    this.showRoleModal = true; // Show the role modal
  }

  onRoleSelected(role: string) {
    // Store role in localStorage for compatibility with existing components
    localStorage.setItem('isAdmin', role === 'admin' ? 'true' : 'false');
    this.showRoleModal = false;
  }
}
