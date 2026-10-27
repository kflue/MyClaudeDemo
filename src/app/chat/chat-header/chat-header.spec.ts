import { TestBed } from '@angular/core/testing';
import { ChatHeader } from './chat-header';
import { ChatStore } from '../chat-store';

describe('ChatHeader', () => {
  it('updates the selected model', async () => {
    const fixture = TestBed.createComponent(ChatHeader);
    fixture.componentRef.setInput('sidebarOpen', false);
    await fixture.whenStable();

    const select = (fixture.nativeElement as HTMLElement).querySelector('select')!;
    select.value = select.options[1].value;
    select.dispatchEvent(new Event('change'));

    expect(TestBed.inject(ChatStore).selectedModel()).toBe(select.options[1].value);
  });
});
