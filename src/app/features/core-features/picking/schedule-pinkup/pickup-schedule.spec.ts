import { cairoClock, closingTime, nextWorkingDate } from './pickup-schedule';

describe('Pickup schedule rules', () => {
  it('uses the agreed closing times for city IDs from the city service', () => {
    for (const city of ['CAI', 'MAD', 'HEL', 'NCO', 'RHB']) expect(closingTime(city)).toBe('17:30');
    for (const city of ['ALX', 'RAM', 'OCT']) expect(closingTime(city)).toBe('16:00');
    for (const city of ['BNS', 'ASW', 'QZZ', 'GIZ', 'MOH', 'SHZ', 'OBR', 'BAD', 'NCC']) expect(closingTime(city)).toBe('15:00');
  });

  it('moves Friday and Saturday to Sunday and preserves working days', () => {
    expect(nextWorkingDate('2026-10-30')).toBe('2026-11-01');
    expect(nextWorkingDate('2026-10-31')).toBe('2026-11-01');
    expect(nextWorkingDate('2026-11-01')).toBe('2026-11-01');
  });

  it('uses Egypt time across the daylight-saving transition', () => {
    expect(cairoClock(new Date('2026-07-01T21:17:00Z'))).toEqual({ date: '2026-07-02', time: '00:17' });
    expect(cairoClock(new Date('2026-12-01T21:17:00Z'))).toEqual({ date: '2026-12-01', time: '23:17' });
  });
});
