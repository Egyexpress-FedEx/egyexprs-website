// City IDs returned by GetCityListFilterWise. Keep business coverage explicit.
// GIZ, MOH, SHZ, OBR, BAD and NCC close at 15:00, per the agreed business rules.
const CAIRO_CITIES = new Set(['CAI', 'MAY', 'TNT', 'GAR', 'HEL', 'HLW', 'MAD', 'MNT', 'NCO', 'RHB', 'RNCO', 'RAIR', 'RABOR', 'SLO']);
const FOUR_PM_CITIES = new Set(['ALX', 'RAM', 'OCT', 'RAMR', 'RSMO']);

export function closingTime(cityCode: string): string {
  const code = cityCode.trim().toUpperCase();
  return CAIRO_CITIES.has(code) ? '17:30' : FOUR_PM_CITIES.has(code) ? '16:00' : '15:00';
}

export function cairoClock(now = new Date()): { date: string; time: string } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Cairo', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(item => item.type === type)!.value;
  return { date: `${part('year')}-${part('month')}-${part('day')}`, time: `${part('hour')}:${part('minute')}` };
}

export function nextWorkingDate(date: string): string {
  const day = new Date(`${date}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(day.getTime())) return date;
  while ([5, 6].includes(day.getUTCDay())) day.setUTCDate(day.getUTCDate() + 1);
  return day.toISOString().slice(0, 10);
}

export function minutes(time: string): number {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
}

export function timeFromMinutes(value: number): string {
  return `${Math.floor(value / 60).toString().padStart(2, '0')}:${(value % 60).toString().padStart(2, '0')}`;
}

export function displayTime(time: string): string {
  const [hour, minute] = time.split(':').map(Number);
  return `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
}
