import { Routes } from '@angular/router';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { ThreadDetailComponent } from './components/thread-detail/thread-detail.component';
import { ThreadCreateComponent } from './components/thread-create/thread-create.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { MyActivityComponent } from './components/my-activity/my-activity.component';
export const routes: Routes = [
  {
    path: '',
    component: ThreadListComponent
  },
  {
    path: 'thread-detail/:id', // <-- Use this path for detail navigation
    component: ThreadDetailComponent
  },
  {
    path: 'create-thread',
    component: ThreadCreateComponent
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'my-activity',
    component: MyActivityComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
