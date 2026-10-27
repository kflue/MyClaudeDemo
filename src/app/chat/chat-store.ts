import { Service, computed, inject, signal } from '@angular/core';
import { ChatMessage, Conversation } from './chat.models';
import { MockLlm } from './mock-llm';

export const MODELS = ['llama3.2:3b', 'mistral:7b', 'qwen2.5:14b'] as const;

const TITLE_MAX_LENGTH = 40;

let nextId = 0;
const createId = () => `${Date.now().toString(36)}-${nextId++}`;

function toTitle(text: string): string {
  const singleLine = text.replace(/\s+/g, ' ').trim();
  return singleLine.length > TITLE_MAX_LENGTH
    ? `${singleLine.slice(0, TITLE_MAX_LENGTH - 1)}…`
    : singleLine;
}

/** In-memory state for all conversations. */
@Service()
export class ChatStore {
  private readonly llm = inject(MockLlm);

  private readonly _conversations = signal<readonly Conversation[]>([]);
  private readonly _activeId = signal<string | null>(null);
  private readonly _isResponding = signal(false);

  readonly models = MODELS;
  readonly selectedModel = signal<string>(MODELS[0]);

  readonly conversations = this._conversations.asReadonly();
  readonly activeId = this._activeId.asReadonly();
  readonly isResponding = this._isResponding.asReadonly();

  readonly activeConversation = computed(
    () => this._conversations().find((c) => c.id === this._activeId()) ?? null,
  );
  readonly messages = computed(() => this.activeConversation()?.messages ?? []);

  /** Shows an empty chat; the conversation itself is created on the first message. */
  newChat(): void {
    if (!this._isResponding()) {
      this._activeId.set(null);
    }
  }

  select(id: string): void {
    if (!this._isResponding()) {
      this._activeId.set(id);
    }
  }

  send(text: string): void {
    const content = text.trim();
    if (!content || this._isResponding()) {
      return;
    }

    const conversationId = this._activeId() ?? this.startConversation(content);
    const assistantId = createId();
    this.appendMessages(conversationId, [
      { id: createId(), role: 'user', content },
      { id: assistantId, role: 'assistant', content: '', model: this.selectedModel() },
    ]);

    this._isResponding.set(true);
    this.llm.stream(content, this.selectedModel()).subscribe({
      next: (token) => this.appendToken(conversationId, assistantId, token),
      error: () => this._isResponding.set(false),
      complete: () => this._isResponding.set(false),
    });
  }

  private startConversation(firstMessage: string): string {
    const id = createId();
    this._conversations.update((list) => [
      { id, title: toTitle(firstMessage), messages: [] },
      ...list,
    ]);
    this._activeId.set(id);
    return id;
  }

  private appendMessages(conversationId: string, messages: readonly ChatMessage[]): void {
    this.updateConversation(conversationId, (c) => ({
      ...c,
      messages: [...c.messages, ...messages],
    }));
  }

  private appendToken(conversationId: string, messageId: string, token: string): void {
    this.updateConversation(conversationId, (c) => ({
      ...c,
      messages: c.messages.map((m) =>
        m.id === messageId ? { ...m, content: m.content + token } : m,
      ),
    }));
  }

  private updateConversation(id: string, fn: (c: Conversation) => Conversation): void {
    this._conversations.update((list) => list.map((c) => (c.id === id ? fn(c) : c)));
  }
}
