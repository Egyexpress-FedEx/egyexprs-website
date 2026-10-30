import {
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import type { Cell, SheetData } from "write-excel-file/browser";
import { CONNECTION_ERROR_MESSAGE } from "../../../../shared/stats/connection-state";
import { Toast } from "../../../../shared/ui/toast/toast";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Dropdowns } from "../../rating/service/domestic/dropdowns";
import { cairoClock } from "../schedule-pinkup/pickup-schedule";

import { PickupBookings } from "../service/pickup-bookings";
import { PickupFilters, PickupSearchStatus } from "../interface/pickup-list";
import { pickupRows } from "./pickup-rows";
type Filters = PickupFilters;

@Component({
  imports: [DatePipe, RouterLink, Toast],
  selector: "app-mange-pickup",
  styleUrl: "./mange-pickup.css",
  templateUrl: "./mange-pickup.html",
})
export class MangePickup {
  readonly dropdowns = inject(Dropdowns);
  readonly bookings = inject(PickupBookings);
  private readonly destroyRef = inject(DestroyRef);
  readonly copyToast = signal<{ success: boolean; message: string } | null>(
    null
  );
  private copyToastTimer?: ReturnType<typeof setTimeout>;
  private readonly route = inject(ActivatedRoute);
  readonly busy = computed(
    () =>
      this.bookings.loading() ||
      (!!this.filters().status && this.bookings.statusLoading())
  );
  readonly noticeTitle = signal("");
  readonly noticeText = signal("");
  private readonly noticeDialog =
    viewChild<ElementRef<HTMLDialogElement>>("noticeDialog");
  private readonly searchAttempt = signal(0);
  private shownNotice = "";
  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.copyToastTimer));
    this.dropdowns.loadCities();
    this.dropdowns.loadServices();
    const number = this.route.snapshot.queryParamMap.get("bookingNo");
    if (number) {
      this.bookingSearch.set(number);
      this.filters.set({ from: "", to: "", address: "", number, status: "" });
    }
    void this.bookings.loadAll();
    effect(() => {
      const dialog = this.noticeDialog()?.nativeElement;
      if (!dialog || this.busy()) return;
      const error = this.bookings.error();
      if (!error || error === CONNECTION_ERROR_MESSAGE) {
        this.shownNotice = "";
        return;
      }
      const description = error;
      const key = this.searchAttempt() + ":" + description;
      if (key === this.shownNotice) return;
      this.shownNotice = key;
      this.noticeTitle.set("Unable to load pickups");
      this.noticeText.set(description);
      if (!dialog.open) dialog.showModal?.();
    });
  }
  readonly today = cairoClock().date;
  readonly initialFilters: Filters = {
    from: "",
    to: "",
    address: "",
    number: "",
    status: "",
  };
  readonly filters = signal<Filters>({ ...this.initialFilters });
  readonly draft = signal<Filters>({
    ...this.initialFilters,
    from: this.today,
    to: this.today,
  });
  readonly origin = signal("");
  readonly bookingSearch = signal("");
  readonly page = signal(1);
  readonly pageSize = 20;
  readonly message = signal("");
  readonly exporting = signal(false);
  readonly filterError = signal("");
  readonly filterDialog =
    viewChild<ElementRef<HTMLDialogElement>>("filterDialog");
  readonly rows = computed(() =>
    pickupRows(
      this.bookings.bookings(),
      this.dropdowns.cities(),
      this.dropdowns.services()
    )
  );
  readonly filteredRows = computed(() => {
    if (this.busy() || this.bookings.error()) return [];
    const f = this.filters();
    const rows = f.status
      ? pickupRows(
          this.bookings.statusBookings(),
          this.dropdowns.cities(),
          this.dropdowns.services()
        )
      : this.rows();
    const number = f.number.trim().toLowerCase();
    const address = f.address.trim().toLowerCase();
    const allDates = this.hasDetailSearch(f);
    return rows.filter(
      (row) =>
        (!number || row.number.toLowerCase().includes(number)) &&
        (allDates ||
          ((!f.from || row.created >= f.from) &&
            (!f.to || row.created <= f.to))) &&
        (!this.origin() || row.cityCode === this.origin()) &&
        (!address || row.receiverNames.some((value) => value.includes(address)))
    );
  });
  readonly visibleRows = computed(() =>
    this.filteredRows().slice(
      (this.page() - 1) * this.pageSize,
      this.page() * this.pageSize
    )
  );
  readonly pageCount = computed(() =>
    Math.ceil(this.filteredRows().length / this.pageSize)
  );
  readonly pages = computed(() =>
    Array.from({ length: this.pageCount() }, (_, index) => index + 1)
  );
  readonly firstRow = computed(() =>
    this.filteredRows().length ? (this.page() - 1) * this.pageSize + 1 : 0
  );
  readonly lastRow = computed(() =>
    Math.min(this.page() * this.pageSize, this.filteredRows().length)
  );
  readonly isDefaultView = computed(
    () =>
      JSON.stringify(this.filters()) === JSON.stringify(this.initialFilters) &&
      !this.origin()
  );

  private hasDetailSearch(filters: Filters): boolean {
    return !!(
      this.origin() ||
      filters.number.trim() ||
      filters.address.trim() ||
      filters.status
    );
  }
  readonly draftSearchesAllDates = computed(() =>
    this.hasDetailSearch(this.draft())
  );

  openFilters(): void {
    const filters = this.filters();
    const today = cairoClock().date;
    this.draft.set(
      !this.hasDetailSearch(filters) && !filters.from && !filters.to
        ? { ...filters, from: today, to: today }
        : { ...filters }
    );
    this.filterError.set("");
    this.filterDialog()?.nativeElement.showModal();
  }
  closeFilters(): void {
    this.filterDialog()?.nativeElement.close();
  }
  setDraft(field: keyof Filters, value: string): void {
    if (
      field === "status" &&
      !["", "Collected", "Pending", "Verification Pending"].includes(value)
    )
      return;
    this.draft.update((draft) => {
      const next: Filters = { ...draft, [field]: value as PickupSearchStatus };
      return this.hasDetailSearch(next) ? { ...next, from: "", to: "" } : next;
    });
    this.filterError.set("");
  }
  clearDraft(): void {
    const today = cairoClock().date;
    this.draft.set({
      ...this.initialFilters,
      from: this.origin() ? "" : today,
      to: this.origin() ? "" : today,
    });
    this.filterError.set("");
  }
  applyFilters(): void {
    const values = this.draft();
    const draft = this.hasDetailSearch(values)
      ? { ...values, from: "", to: "" }
      : values;
    if (
      !this.hasDetailSearch(draft) &&
      draft.from &&
      draft.to &&
      draft.from > draft.to
    ) {
      this.filterError.set("Date to must be on or after Date from.");
      return;
    }
    this.filters.set({ ...draft });
    this.bookingSearch.set(draft.number);
    this.page.set(1);
    this.message.set("");
    this.closeFilters();
    this.runSearch();
  }
  updateBookingSearch(value: string): void {
    this.bookingSearch.set(value);
    const number = value.trim();
    this.filters.update((filters) => ({
      ...filters,
      number,
      from: "",
      to: "",
    }));
    this.page.set(1);
    this.message.set("");
  }
  searchBooking(): void {
    this.updateBookingSearch(this.bookingSearch());
    this.searchAttempt.update((value) => value + 1);
  }
  clearBookingSearch(): void {
    this.updateBookingSearch("");
  }
  changeOrigin(city: string): void {
    this.origin.set(city);
    if (city)
      this.filters.update((filters) => ({ ...filters, from: "", to: "" }));
    this.page.set(1);
    this.message.set("");
    this.runSearch();
  }
  viewAll(): void {
    this.bookings.clearStatus();
    this.bookingSearch.set("");
    this.filters.set({ from: "", to: "", address: "", number: "", status: "" });
    this.origin.set("");
    this.page.set(1);
    this.message.set("");
  }
  private runSearch(): void {
    this.searchAttempt.update((value) => value + 1);
    if (this.filters().status)
      void this.bookings.searchStatus(
        { ...this.filters(), number: "" },
        this.origin()
      );
    else {
      this.bookings.clearStatus();
      void this.bookings.loadAll();
    }
  }
  async refresh(): Promise<void> {
    await this.bookings.loadAll(true);
    if (!this.bookings.error()) this.runSearch();
  }
  closeNotice(): void {
    this.noticeDialog()?.nativeElement.close?.();
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.pageCount()) this.page.set(page);
  }
  async copyNumber(number: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(number);
      this.showCopyToast(true, number + " copied to clipboard.");
    } catch {
      this.showCopyToast(
        false,
        "Select the booking number and copy it manually."
      );
    }
  }
  dismissCopyToast(): void {
    clearTimeout(this.copyToastTimer);
    this.copyToast.set(null);
  }
  private showCopyToast(success: boolean, message: string): void {
    clearTimeout(this.copyToastTimer);
    this.copyToast.set({ success, message });
    this.copyToastTimer = setTimeout(() => this.copyToast.set(null), 3000);
  }
  async exportPreview(): Promise<void> {
    const rows = this.filteredRows();
    if (!rows.length || this.busy() || this.exporting()) return;
    this.exporting.set(true);
    this.message.set("");
    try {
      const { default: writeXlsxFile } = await import(
        "write-excel-file/browser"
      );
      const dateCell = (date: string): Cell =>
        date
          ? {
              value: new Date(date + "T00:00:00Z"),
              type: Date,
              format: "dd mmm yyyy",
            }
          : { value: "—", type: String };
      const headings = [
        "Created date",
        "Pickup date",
        "Pickup time",
        "Pickup number",
        "Customer",
        "Pickup address",
        "Origin city",
        "Status",
        "Service",
      ];
      const data: SheetData = [
        headings.map((value) => ({
          value,
          type: String,
          fontWeight: "bold",
          backgroundColor: "#F36B12",
          color: "#FFFFFF",
          height: 28,
        })),
        ...rows.map((row) => [
          dateCell(row.created),
          dateCell(row.date),
          ...[
            row.time,
            row.number,
            row.name,
            row.address,
            row.city,
            row.status,
            row.service,
          ].map((value) => ({ value, type: String })),
        ]),
      ];
      await writeXlsxFile(data, {
        sheet: "Pickups",
        stickyRowsCount: 1,
        columns: [18, 18, 26, 20, 24, 32, 20, 24, 24].map((width) => ({
          width,
        })),
      }).toFile("EGXpress-pickups-" + this.today + ".xlsx");
      this.message.set(rows.length + " bookings exported.");
    } catch {
      this.message.set("Unable to export bookings. Please try again.");
    } finally {
      this.exporting.set(false);
    }
  }
}
