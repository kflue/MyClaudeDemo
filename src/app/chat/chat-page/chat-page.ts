import { Component, signal } from '@angular/core';
import { ChatHeader } from '../chat-header/chat-header';
import { ChatInput } from '../chat-input/chat-input';
import { ChatMessageList } from '../chat-message-list/chat-message-list';
import { ChatSidebar } from '../chat-sidebar/chat-sidebar';

@Component({
  imports: [ChatSidebar, ChatHeader, ChatMessageList, ChatInput],
  selector: 'app-chat-page',
  styleUrl: './chat-page.scss',
  templateUrl: './chat-page.html',
  host: {
    '[class.sidebar-open]': 'sidebarOpen()',
    '(keydown.escape)': 'sidebarOpen.set(false)',
  },
})
export class ChatPage {
  /** Only affects narrow viewports; the sidebar is always visible on desktop. */
  protected readonly sidebarOpen = signal(false);
}
