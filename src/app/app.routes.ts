import { Routes } from '@angular/router';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { ThreadDetailComponent } from './components/thread-detail/thread-detail.component';
import { ThreadCreateComponent } from './components/thread-create/thread-create.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MyActivityComponent } from './components/my-activity/my-activity.component';
import { AdminThreadListComponent } from './components/admin-thread-list/admin-thread-list.component'; // <-- Import AdminThreadListComponent
import { AuthGuard } from './guards/auth.guard'; // <-- Import AuthGuard

export const routes: Routes = [
  {
    path: '',
    component: ThreadListComponent
  },
  {
    path: 'thread-detail/:id', // <-- Use this path for detail navigation
    component: ThreadDetailComponent,
    canActivate: [AuthGuard] // <-- Add auth guard protection
  },
  {
    path: 'create-thread',
    component: ThreadCreateComponent,
    canActivate: [AuthGuard] // <-- Add auth guard protection  
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'my-activity',
    component: MyActivityComponent,
    canActivate: [AuthGuard] // <-- Add auth guard protection
  },
  {
    path: 'admin',
    component: AdminThreadListComponent, // Use your thread list component here
    canActivate: [AuthGuard] // <-- Add auth guard protection
  },
  {
    path: '**',
    redirectTo: ''
  }
];
