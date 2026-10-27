import { TestBed } from '@angular/core/testing';
import { ChatStore, MODELS } from './chat-store';
import { MOCK_REPLY } from './mock-llm';

describe('ChatStore', () => {
  let store: ChatStore;

  beforeEach(() => {
    vi.useFakeTimers();
    store = TestBed.inject(ChatStore);
  });
  afterEach(() => vi.useRealTimers());

  it('starts with no conversations and the first model selected', () => {
    expect(store.conversations()).toEqual([]);
    expect(store.activeConversation()).toBeNull();
    expect(store.selectedModel()).toBe(MODELS[0]);
  });

  it('creates a conversation on the first message and streams the mocked reply', async () => {
    store.send('  Hello there  ');

    expect(store.conversations().length).toBe(1);
    expect(store.activeConversation()?.title).toBe('Hello there');
    expect(store.isResponding()).toBe(true);
    expect(store.messages().map((m) => [m.role, m.content])).toEqual([
      ['user', 'Hello there'],
      ['assistant', ''],
    ]);
    expect(store.messages()[1].model).toBe(MODELS[0]);

    await vi.runAllTimersAsync();

    expect(store.messages()[1].content).toBe(MOCK_REPLY);
    expect(store.isResponding()).toBe(false);
  });

  it('truncates long titles', () => {
    store.send('a'.repeat(100));
    const title = store.activeConversation()!.title;
    expect(title.length).toBe(40);
    expect(title.endsWith('…')).toBe(true);
  });

  it('ignores blank messages and messages sent while responding', () => {
    store.send('   ');
    expect(store.conversations()).toEqual([]);

    store.send('first');
    store.send('second');
    expect(store.messages().filter((m) => m.role === 'user').length).toBe(1);
  });

  it('keeps conversations separate and lists the newest first', async () => {
    store.send('first');
    await vi.runAllTimersAsync();
    const firstId = store.activeId();

    store.newChat();
    expect(store.activeConversation()).toBeNull();

    store.send('second');
    await vi.runAllTimersAsync();
    expect(store.conversations().map((c) => c.title)).toEqual(['second', 'first']);

    store.select(firstId!);
    expect(store.messages()[0].content).toBe('first');
  });
});
