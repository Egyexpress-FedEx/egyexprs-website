export interface PickupListRequest {
  AccessCode: string;
  ActiveDataBase: string;
  FilterCondition: string;
}

export interface PickupListResponse {
  Description: string;
  JasonString: string;
  code: string;
}

export interface PickupBooking {
  BookingRefNo: string;
  CustCode: string;
  Status: string;
  ShipBookingDate: string;
  BookingTime: string;
  PickupDate: string;
  PickupReadyTime: string;
  PickupBeforeTime: string;
  Origin: string;
  ServiceType: string;
  CustName?: string | null;
  SendersName?: string | null;
  SendersAddress1?: string | null;
  SendersCity?: string | null;
  ReceiversName?: string | null;
  ReceiversContactPerson?: string | null;
  RouteAllocated?: string | null;
  Courier?: string | null;
  AWB?: string | null;
  Destination?: string | null;
  ProductType?: string | null;
  ShipperRef?: string | null;
  VehicleType?: string | null;
  NoofPieces?: number | null;
  ShipmentWeight?: number | null;
  CashOnPickup?: number | null;
  ShipmentCash?: number | null;
  ShipmentValue?: number | null;
  ProductDescription?: string | null;
  PickupInstruction?: string | null;
  PickupLandMark?: string | null;
  BookingContactPerson?: string | null;
  BookingEmail?: string | null;
  SendersContactPerson?: string | null;
  SendersCountry?: string | null;
  SendersPhone1?: string | null;
  SendersMobile?: string | null;
  SendersEmail?: string | null;
  PickupBranch?: string | null;
  CreatedBy?: string | null;
}

export type PickupSearchStatus = '' | 'Collected' | 'Pending' | 'Verification Pending';
export interface PickupFilters {
  from: string;
  to: string;
  address: string;
  number: string;
  status: PickupSearchStatus;
}

const STATUS_CONDITIONS: Record<Exclude<PickupSearchStatus, ''>, string> = {
  Collected: 'PickupDone=1',
  Pending: 'PickupDone=0',
  'Verification Pending': 'Confirmed=0',
};

function literal(value: string): string { return value.replace(/'/g, "''"); }
function likeLiteral(value: string): string {
  return literal(value).replace(/[\[\]%_]/g, character => '[' + character + ']');
}

// This API accepts SQL fragments. Only fixed column names/operators are emitted;
// user values are quoted as literals. The server must enforce account access.
export function pickupFilterCondition(customerCode: string, filters?: PickupFilters, origin = ''): string {
  if (!customerCode.trim()) throw new Error('Your customer account is unavailable. Please sign in again.');
  let condition = " and CustCode = '" + literal(customerCode.trim()) + "'";
  if (!filters) return condition;
  const allDates = !!(origin || filters.number.trim() || filters.address.trim() || filters.status);
  if (!allDates) {
    for (const [date, operator] of [[filters.from, '>='], [filters.to, '<=']]) {
      if (!date) continue;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('Invalid booking date.');
      condition += " And BookingDate " + operator + "'" + date + "'";
    }
  }
  if (filters.number.trim()) condition += " And BookingRefno = '" + literal(filters.number.trim()) + "'";
  if (origin) condition += " And Origin = '" + literal(origin) + "'";
  if (filters.address.trim()) {
    const address = likeLiteral(filters.address.trim());
    condition += " And (ReceiversName like N'%" + address + "%' or ReceiversContactPerson like N'%" + address + "%')";
  }
  if (filters.status) {
    const statusCondition = STATUS_CONDITIONS[filters.status];
    if (!statusCondition) throw new Error('Invalid pickup status.');
    condition += ' And ' + statusCondition;
  }
  return condition;
}

export function parsePickupResponse(response: PickupListResponse, customerCode: string): PickupBooking[] {
  if (String(response.code) !== '1') throw new Error(response.Description || 'Unable to load pickups.');
  let rows: unknown;
  try { rows = JSON.parse(response.JasonString); }
  catch { throw new Error('The pickup response could not be read. Please try again.'); }
  if (!Array.isArray(rows) || !rows.every(row => row && typeof row === 'object' &&
      typeof row.BookingRefNo === 'string' && typeof row.CustCode === 'string' && typeof row.Status === 'string')) {
    throw new Error('The pickup response has an invalid format.');
  }
  if (rows.some(row => row.CustCode.trim().toLowerCase() !== customerCode.trim().toLowerCase())) {
    throw new Error('The returned bookings do not match your account. Please contact support.');
  }
  return rows as PickupBooking[];
}
