import { Component, inject, output } from '@angular/core';
import { ChatStore } from '../chat-store';

@Component({
  selector: 'app-chat-sidebar',
  styleUrl: './chat-sidebar.scss',
  templateUrl: './chat-sidebar.html',
})
export class ChatSidebar {
  protected readonly store = inject(ChatStore);

  /** Emitted after the user picks a chat, so the page can close the sidebar on mobile. */
  readonly navigated = output();

  protected newChat(): void {
    this.store.newChat();
    this.navigated.emit();
  }

  protected select(id: string): void {
    this.store.select(id);
    this.navigated.emit();
  }
}
