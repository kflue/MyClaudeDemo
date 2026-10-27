export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  readonly id: string;
  readonly role: ChatRole;
  readonly content: string;
  /** Model that produced an assistant message. */
  readonly model?: string;
}

export interface Conversation {
  readonly id: string;
  readonly title: string;
  readonly messages: readonly ChatMessage[];
}
