import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  @Output() registered = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  registerForm: FormGroup;
  success = '';
  error = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Register form submitted', this.registerForm.value);
    if (this.registerForm.valid) {
      this.http.post('http://localhost:5226/api/users/register', this.registerForm.value)
        .subscribe({
          next: (response: any) => {
            const registeredEmail = response.email; // Assuming the response contains the registered email
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response.id); // Make sure response.id is the user ID!
            localStorage.setItem('userEmail', registeredEmail);
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

  onRegisterSuccess() {
    this.registered.emit();
  }

  onClose() {
    this.close.emit();
  }
}