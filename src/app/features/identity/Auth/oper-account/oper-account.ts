import { Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-oper-account',
  styleUrl: './oper-account.css',
  templateUrl: './oper-account.html',
})
export class OperAccount implements OnDestroy {
  @ViewChild('accountDialog') private dialog!: ElementRef<HTMLDialogElement>;
  private readonly document = inject(DOCUMENT);
  private previousOverflow: string | null = null;
  readonly submitted = signal(false);
  readonly notice = signal('');
  readonly form = new FormGroup({
    company: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    postalCode: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[+\d][\d\s()-]{6,19}$/)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    vat: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true }),
    service: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    promotions: new FormControl(false, { nonNullable: true }),
    privacy: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });
  readonly fields = [
    { key: 'company', label: 'Company Name', type: 'text', autocomplete: 'organization', placeholder: 'Your registered company name', required: true, wide: true },
    { key: 'firstName', label: 'First Name', type: 'text', autocomplete: 'given-name', placeholder: 'First name', required: true, wide: false },
    { key: 'lastName', label: 'Last Name', type: 'text', autocomplete: 'family-name', placeholder: 'Last name', required: true, wide: false },
    { key: 'address', label: 'Address', type: 'text', autocomplete: 'street-address', placeholder: 'Building, street and area', required: true, wide: false },
    { key: 'postalCode', label: 'Postal Code', type: 'text', autocomplete: 'postal-code', placeholder: 'Postal code', required: false, wide: false },
    { key: 'city', label: 'City', type: 'text', autocomplete: 'address-level2', placeholder: 'Your city', required: true, wide: false },
    { key: 'phone', label: 'Phone number', type: 'tel', autocomplete: 'tel', placeholder: 'Your contact number', required: true, wide: false },
    { key: 'email', label: 'Email Address', type: 'email', autocomplete: 'email', placeholder: 'you@company.com', required: true, wide: false },
    { key: 'vat', label: 'VAT Number', type: 'text', autocomplete: 'off', placeholder: 'Company VAT number', required: false, wide: false },
  ];
  openAccount() {
    if (this.dialog.nativeElement.open) return;
    this.notice.set('');
    this.dialog.nativeElement.showModal();
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
  }
  closeAccount() { this.dialog.nativeElement.close(); this.restoreScroll(); }
  restoreScroll() {
    if (this.previousOverflow !== null) {
      this.document.body.style.overflow = this.previousOverflow;
      this.previousOverflow = null;
    }
  }
  onBackdrop(event: MouseEvent) {
    const dialog = this.dialog.nativeElement;
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) this.closeAccount();
  }
  error(key: string) {
    const field = this.form.get(key);
    if (!field?.invalid || !(field.touched || this.submitted())) return '';
    if (key === 'privacy') return 'Please confirm that you have read the Privacy Policy.';
    if (field.hasError('required')) return 'This field is required.';
    if (field.hasError('email')) return 'Enter a valid email address.';
    return 'Enter a valid phone number.';
  }
  submitAccount() {
    this.submitted.set(true);
    this.notice.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.dialog.nativeElement.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    this.notice.set('Online account requests will be available soon. Your request has not been sent.');
  }
  ngOnDestroy() { this.restoreScroll(); }
}
