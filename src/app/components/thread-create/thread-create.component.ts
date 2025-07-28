import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThreadService, ThreadCreateRequest } from '../../services/thread.service';

@Component({
  selector: 'app-thread-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- Add CommonModule here
  templateUrl: './thread-create.component.html',
  styleUrls: ['./thread-create.component.scss']
})
export class ThreadCreateComponent {
  @Input() author: string = '';
  @Output() created = new EventEmitter<void>();
  threadForm: FormGroup;
  success = '';
  error = '';

  tagOptions = ['Frontend', '.NET', 'SQL', 'Angular', 'C#', 'Database'];
  selectedTags: string[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private threadService: ThreadService) {
    this.threadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['']
    });
  }

  onSubmit() {
    if (this.threadForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        this.error = 'You must be logged in to create a thread';
        return;
      }

      let tagsValue = this.threadForm.value.tags;
      if (Array.isArray(tagsValue)) {
        tagsValue = tagsValue.join(',');
      }
      const threadData: ThreadCreateRequest = {
        title: this.threadForm.value.title,
        description: this.threadForm.value.description,
        tags: tagsValue,
        author: currentUser.username,
        userId: currentUser.id
      };
      
      console.log('Thread data being sent:', threadData);
      console.log('Current user:', currentUser);
      console.log('Auth token:', this.authService.getToken());

      // Use ThreadService instead of direct HTTP call
      this.threadService.createThread(threadData).subscribe({
        next: (response) => {
          console.log('Thread created successfully:', response);
          this.success = 'Thread created!';
          this.error = '';
          this.threadForm.reset();
          this.selectedTags = [];
          this.created.emit();
        },
        error: (err) => {
          console.error('Full error object:', err);
          console.error('Error status:', err.status);
          console.error('Error message:', err.message);
          console.error('Error body:', err.error);
          
          if (err.status === 401) {
            this.error = 'You are not authorized. Please log in again.';
          } else if (err.status === 400) {
            this.error = 'Invalid data provided. Please check your inputs.';
          } else {
            this.error = err.error?.message || err.message || 'Failed to create thread';
          }
          this.success = '';
        }
      });
    } else {
      this.error = 'Please fill in all required fields';
      this.success = '';
    }
  }

  onTagChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedTags.push(input.value);
    } else {
      this.selectedTags = this.selectedTags.filter(tag => tag !== input.value);
    }
    // Update the form control value as a comma-separated string or array as needed by your backend
    this.threadForm.get('tags')?.setValue(this.selectedTags.join(','));
  }
}