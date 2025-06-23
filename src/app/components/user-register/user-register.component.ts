import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {
  @Output() registered = new EventEmitter<void>();
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
    if (this.registerForm.valid) {
      this.http.post('/api/users/register', this.registerForm.value).subscribe({
        next: () => {
          this.success = 'Registration successful!';
          this.error = '';
          this.registerForm.reset();
          this.registered.emit();
        },
        error: err => {
          this.error = err.error?.message || 'Registration failed';
          this.success = '';
        }
      });
    }
  }
}