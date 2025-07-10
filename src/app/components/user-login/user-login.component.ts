import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RoleModalComponent } from '../role-modal/role-modal.component';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RoleModalComponent],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() loggedIn = new EventEmitter<void>();
  @Output() authSuccess = new EventEmitter<void>();
  loginForm: FormGroup;
  error = '';
  showRoleModal = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
      this.http.post('http://localhost:5226/api/users/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response.id);
            localStorage.setItem('userEmail', response.email);
            this.loginForm.reset();
            this.authSuccess.emit();
          },
          error: err => {
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
    localStorage.setItem('isAdmin', role === 'admin' ? 'true' : 'false');
    this.showRoleModal = false;
  }
}