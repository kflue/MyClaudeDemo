import { Component, computed, inject, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ChatStore } from '../chat-store';

@Component({
  imports: [FormField],
  selector: 'app-chat-input',
  styleUrl: './chat-input.scss',
  templateUrl: './chat-input.html',
})
export class ChatInput {
  protected readonly store = inject(ChatStore);

  private readonly model = signal({ prompt: '' });
  protected readonly chatForm = form(this.model);

  protected readonly canSend = computed(
    () => !!this.model().prompt.trim() && !this.store.isResponding(),
  );

  protected submit(event?: Event): void {
    event?.preventDefault();
    if (!this.canSend()) {
      return;
    }
    this.store.send(this.model().prompt);
    this.model.set({ prompt: '' });
  }

  /** Enter sends; Shift+Enter inserts a newline; ignore Enter while composing (IME). */
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      this.submit(event);
    }
  }
}
