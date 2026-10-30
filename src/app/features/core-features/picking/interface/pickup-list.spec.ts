import { describe, expect, it } from 'vitest';
import { parsePickupResponse, pickupFilterCondition, PickupFilters } from './pickup-list';
const empty: PickupFilters = { from: '', to: '', address: '', number: '', status: '' };
describe('Pickup query contract', () => {
  it('loads all customer bookings without optional filters', () => {
    expect(pickupFilterCondition('D77777')).toBe(" and CustCode = 'D77777'");
    expect(parsePickupResponse({ code: '1', Description: 'SUCCESS', JasonString: '[]' }, 'D77777')).toEqual([]);
  });
  it('uses server status predicates and drops dates for detail searches', () => {
    for (const [status, predicate] of [['Pending', 'PickupDone=0'], ['Collected', 'PickupDone=1'], ['Verification Pending', 'Confirmed=0']] as const) {
      const query = pickupFilterCondition('D77777', { ...empty, from: '2026-10-01', to: '2026-10-30', status });
      expect(query).toContain(predicate); expect(query).not.toContain('BookingDate');
    }
    expect(pickupFilterCondition('D77777', { ...empty, from: '2026-10-01' })).toContain("BookingDate >='2026-10-01'");
  });
  it('quotes customer values and searches the receiver fields as literals', () => {
    const query = pickupFilterCondition('D77777', { ...empty, address: "O'Brien%", number: "S1' OR 1=1 --" }, 'BNS');
    expect(query).toContain("BookingRefno = 'S1'' OR 1=1 --'");
    expect(query).toContain("ReceiversName like N'%O''Brien[%]%'");
    expect(query).toContain('ReceiversContactPerson'); expect(query).not.toContain('SendersAddress');
  });
  it('rejects malformed payloads, API errors and another customer’s bookings', () => {
    expect(() => parsePickupResponse({ code: '-1', Description: 'Denied', JasonString: '[]' }, 'D1')).toThrow('Denied');
    expect(() => parsePickupResponse({ code: '1', Description: 'SUCCESS', JasonString: 'invalid' }, 'D1')).toThrow();
    expect(() => parsePickupResponse({ code: '1', Description: 'SUCCESS', JasonString: JSON.stringify([{ BookingRefNo: 'S1', CustCode: 'D2', Status: 'Booking Created' }]) }, 'D1')).toThrow('do not match');
  });
});
