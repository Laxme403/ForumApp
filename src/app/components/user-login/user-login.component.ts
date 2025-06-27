import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>(); // Add this output for closing modal
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginForm.reset();
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.userService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        this.loggedIn.emit(response);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error = 'Invalid email or password';
      }
    });
  }

  resetForm() {
    this.loginForm.reset();
  }

  close() {
    this.closeModal.emit();
  }
}
