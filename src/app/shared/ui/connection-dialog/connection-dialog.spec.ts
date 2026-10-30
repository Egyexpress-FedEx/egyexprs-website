import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ConnectionDialog } from './connection-dialog';
import { ConnectionState } from '../../stats/connection-state';

describe('ConnectionDialog', () => {
  it('shows one modal for repeated failures and supports dismissal and reopening', async () => {
    await TestBed.configureTestingModule({ imports: [ConnectionDialog] }).compileComponents();
    const fixture = TestBed.createComponent(ConnectionDialog);
    await fixture.whenStable();
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal = vi.fn(() => { dialog.open = true; });
    dialog.close = vi.fn(() => { dialog.open = false; });
    const state = TestBed.inject(ConnectionState);
    state.show(); await fixture.whenStable();
    expect(dialog.showModal).toHaveBeenCalledTimes(1);
    expect(dialog.textContent).toContain('Please check your internet connection');
    state.show(); await fixture.whenStable();
    expect(dialog.showModal).toHaveBeenCalledTimes(1);
    (dialog.querySelector('button') as HTMLButtonElement).click(); await fixture.whenStable();
    expect(state.visible()).toBe(false); expect(dialog.open).toBe(false);
    state.show(); await fixture.whenStable();
    expect(dialog.showModal).toHaveBeenCalledTimes(2);
  });
});
