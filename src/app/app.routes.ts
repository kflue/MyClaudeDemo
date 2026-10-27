import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Chat',
    loadComponent: () => import('./chat/chat-page/chat-page').then((m) => m.ChatPage),
  },
  { path: '**', redirectTo: '' },
];
