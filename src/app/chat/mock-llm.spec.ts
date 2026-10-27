import { TestBed } from '@angular/core/testing';
import { MOCK_REPLY, MockLlm, THINKING_DELAY_MS, TOKEN_DELAY_MS } from './mock-llm';

describe('MockLlm', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('streams the mock reply token by token after a thinking delay', () => {
    const tokens: string[] = [];
    let completed = false;
    TestBed.inject(MockLlm)
      .stream('hi', 'any-model')
      .subscribe({ next: (t) => tokens.push(t), complete: () => (completed = true) });

    vi.advanceTimersByTime(THINKING_DELAY_MS - 1);
    expect(tokens).toEqual([]);

    vi.advanceTimersByTime(1);
    expect(tokens).toEqual(["I'm"]);

    vi.advanceTimersByTime(TOKEN_DELAY_MS);
    expect(tokens).toEqual(["I'm", ' running']);
    expect(tokens.join('')).toBe(MOCK_REPLY);
    expect(completed).toBe(true);
  });
});
