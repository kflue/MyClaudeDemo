import { Component, inject, input, output } from '@angular/core';
import { ChatStore } from '../chat-store';

@Component({
  selector: 'app-chat-header',
  styleUrl: './chat-header.scss',
  templateUrl: './chat-header.html',
})
export class ChatHeader {
  protected readonly store = inject(ChatStore);

  readonly sidebarOpen = input.required<boolean>();
  readonly toggleSidebar = output();

  protected selectModel(event: Event): void {
    this.store.selectedModel.set((event.target as HTMLSelectElement).value);
  }
}
