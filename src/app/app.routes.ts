import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(
        (m) => m.Login
      )
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/layout/layout').then(
        (m) => m.Layout
      ),
    canActivate: [authGuard],
    children: [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard/dashboard').then(
        (m) => m.Dashboard
      )
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/projects/projects/projects').then(
        (m) => m.Projects
      )
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/tasks/tasks').then(
        (m) => m.Tasks
      )
  },
  {
    path: 'kanban',
    loadComponent: () =>
      import('./features/kanban/kanban/kanban').then(
        (m) => m.Kanban
      )
  }
]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];