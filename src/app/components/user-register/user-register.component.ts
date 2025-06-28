import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RoleModalComponent } from '../role-modal/role-modal.component';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RoleModalComponent],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  @Output() registered = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  registerForm: FormGroup;
  usernameForm: FormGroup;
  showUsernameForm = false;
  fetchedUser: any = null;
  success = '';
  error = '';
  showRoleModal = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.usernameForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.registerForm.reset(); // This will clear the form on component load
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:5226/api/users/register', this.registerForm.value)
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response.id);
            localStorage.setItem('userEmail', response.email);
            this.registerForm.reset();
            this.onRegisterSuccess();
          },
          error: err => {
            this.error = err.error?.message || 'Registration failed';
            this.success = '';
          }
        });
    }
  }

  onUsernameSubmit() {
    const username = this.usernameForm.value.username;
    this.http.get(`http://localhost:5226/api/users/by-username/${username}`)
      .subscribe({
        next: (user: any) => {
          this.fetchedUser = user;
          this.error = '';
        },
        error: err => {
          this.fetchedUser = null;
          this.error = err.error?.message || 'User not found';
        }
      });
  }

  onRegisterSuccess() {
    this.registered.emit();    // This should close the register modal in the parent
    this.showRoleModal = true; // Show the role modal
  }

  close() {
    this.closeModal.emit();
  }

  // If you open the modal multiple times, also call this when opening:
  resetForm() {
    this.registerForm.reset();
  }

  onAuthSuccess() {
    this.showRoleModal = true;
  }

  onRoleSelected(role: string) {
    localStorage.setItem('isAdmin', role === 'admin' ? 'true' : 'false');
    this.showRoleModal = false;
  }
}