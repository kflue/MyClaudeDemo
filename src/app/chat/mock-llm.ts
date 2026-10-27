import { Service } from '@angular/core';
import { Observable, concatMap, delay, from, of, timer } from 'rxjs';

export const MOCK_REPLY = "I'm running";
export const THINKING_DELAY_MS = 600;
export const TOKEN_DELAY_MS = 120;

/** Stand-in for a real LLM client: streams a fixed reply token by token. */
@Service()
export class MockLlm {
  stream(_prompt: string, _model: string): Observable<string> {
    const tokens = MOCK_REPLY.split(/(?=\s)/);
    return timer(THINKING_DELAY_MS).pipe(
      concatMap(() => from(tokens)),
      concatMap((token, i) => (i === 0 ? of(token) : of(token).pipe(delay(TOKEN_DELAY_MS)))),
    );
  }
}
