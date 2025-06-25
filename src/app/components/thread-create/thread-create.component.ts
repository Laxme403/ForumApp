import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // <-- Add this

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.threadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['']
    });
  }

  onSubmit() {
    if (this.threadForm.valid) {
      let tagsValue = this.threadForm.value.tags;
      if (Array.isArray(tagsValue)) {
        tagsValue = tagsValue.join(',');
      }
      const threadData = {
        title: this.threadForm.value.title,
        description: this.threadForm.value.description,
        tags: tagsValue,
        author: localStorage.getItem('username') || '', // or this.author if passed as input
        userId: +(localStorage.getItem('userId') || 0), // convert to number
        likes: 0,
        dislikes: 0,
        replies: 0
      };
      console.log('Thread data being sent:', threadData);
      this.http.post('http://localhost:5226/api/threads', threadData).subscribe({
        next: () => {
          this.success = 'Thread created!';
          this.error = '';
          this.threadForm.reset();
          this.created.emit();
        },
        error: err => {
          this.error = err.error?.message || 'Failed to create thread';
          this.success = '';
        }
      });
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

  // Assuming you have a login method where you get the response with username and id
  login() {
    this.http.post('http://localhost:5226/api/login', { /* your login data */ }).subscribe({
      next: (response: any) => {
        localStorage.setItem('username', response.username);
        localStorage.setItem('userId', response.id); // Make sure your backend returns the user id!
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }
}
