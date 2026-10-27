import { Component, ElementRef, afterRenderEffect, inject } from '@angular/core';
import { ChatStore } from '../chat-store';

@Component({
  selector: 'app-chat-message-list',
  styleUrl: './chat-message-list.scss',
  templateUrl: './chat-message-list.html',
})
export class ChatMessageList {
  protected readonly store = inject(ChatStore);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly suggestions = [
    'Explain signals in Angular',
    'Write a haiku about TypeScript',
    'Give me ideas for a weekend project',
  ];

  constructor() {
    // Keep the newest message (and streamed tokens) in view.
    afterRenderEffect(() => {
      this.store.messages();
      const el = this.host.nativeElement;
      el.scrollTop = el.scrollHeight;
    });
  }
}
