import type { PickupBooking } from '../interface/pickup-list';

export interface PickupRow {
  number: string; created: string; date: string; time: string; name: string;
  address: string; city: string; cityCode: string; status: string; service: string;
  receiverNames: string[];
}

export function bookingDate(value: string | undefined): string {
  if (!value) return '';
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
  const match = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})\s+(\d{4})$/i.exec(value.trim());
  if (!match) return '';
  const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(match[1].toLowerCase()) + 1;
  return `${match[3]}-${String(month).padStart(2, '0')}-${match[2].padStart(2, '0')}`;
}
function displayTime(value: string): string {
  const match = /^(\d{1,2}):(\d{2})/.exec(value || '');
  if (!match) return value || '—';
  const hour = Number(match[1]);
  return `${hour % 12 || 12}:${match[2]} ${hour < 12 ? 'AM' : 'PM'}`;
}
export function pickupRows(bookings: PickupBooking[], cities: { cl_CodeID: string; cl_CodeName: string }[], services: { cl_CodeID: string; cl_CodeName: string }[]): PickupRow[] {
  return [...bookings].sort((a, b) => {
    const key = (booking: PickupBooking) => bookingDate(booking.ShipBookingDate) + 'T' + (booking.BookingTime || '').padStart(5, '0');
    return key(b).localeCompare(key(a)) || b.BookingRefNo.localeCompare(a.BookingRefNo, undefined, { numeric: true });
  }).map(booking => ({
    number: booking.BookingRefNo,
    created: bookingDate(booking.ShipBookingDate), date: bookingDate(booking.PickupDate),
    time: displayTime(booking.PickupReadyTime) + ' – ' + displayTime(booking.PickupBeforeTime),
    name: booking.SendersName || booking.CustName || '—', address: booking.SendersAddress1 || '',
    city: cities.find(city => city.cl_CodeID === booking.Origin)?.cl_CodeName || booking.Origin,
    cityCode: booking.Origin, status: booking.Status || '—',
    service: services.find(service => service.cl_CodeID === booking.ServiceType)?.cl_CodeName || booking.ServiceType || '—',
    receiverNames: [booking.ReceiversName || '', booking.ReceiversContactPerson || ''].map(value => value.toLowerCase()),
  }));
}
