import { TestBed } from '@angular/core/testing';
import { ChatPage } from './chat-page';
import { MOCK_REPLY } from '../mock-llm';

describe('ChatPage', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  function setup() {
    const fixture = TestBed.createComponent(ChatPage);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('shows the greeting before any message is sent', async () => {
    const { el } = setup();
    expect(el.querySelector('h1')?.textContent).toContain('How can I help you today?');
    expect(el.querySelector('nav')?.textContent).toContain('No chats yet');
  });

  it('sends a typed message with Enter and renders the streamed reply', async () => {
    const { fixture, el } = setup();
    const textarea = el.querySelector('textarea')!;

    textarea.value = 'Are you up?';
    textarea.dispatchEvent(new Event('input'));
    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
    fixture.detectChanges();

    expect(el.querySelector('.bubble')?.textContent).toContain('Are you up?');
    expect(el.querySelector('.typing')).not.toBeNull();

    await vi.runAllTimersAsync();
    fixture.detectChanges();

    expect(el.querySelector('.assistant .content')?.textContent).toContain(MOCK_REPLY);
    expect(el.querySelector('.chat-link')?.textContent).toContain('Are you up?');
    // Prompt is cleared after sending, so there is nothing left to send.
    expect(el.querySelector<HTMLButtonElement>('.send')!.disabled).toBe(true);
  });

  it('sends a suggestion when its chip is clicked', async () => {
    const { fixture, el } = setup();
    const chip = el.querySelector<HTMLButtonElement>('.suggestion')!;
    chip.click();
    fixture.detectChanges();

    expect(el.querySelector('.bubble')?.textContent?.trim()).toBe(chip.textContent?.trim());
  });
});
