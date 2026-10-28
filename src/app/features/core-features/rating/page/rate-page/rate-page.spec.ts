import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatePage } from './rate-page';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AuthState } from '../../../../../shared/stats/auth-state';
import { DomRate } from '../../domestic/dom-rate/dom-rate';
import { InternationalForm } from '../../international/international-form/international-form';
import { baseLink } from '../../../../../base/baseUrl';

describe('RatePage', () => {
  let component: RatePage;
  let fixture: ComponentFixture<RatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatePage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    TestBed.inject(AuthState).clearCredentials();
  });

  function signIn(type: 'D' | 'I') {
    TestBed.inject(AuthState).setCredentials({ CoCode: 'ACCOUNT', DivCode: '', ShipmentType: type,
      UserID: 'test-user', UserPWD: 'test-password', UserName: 'Test', UserTag: '', UserType: '' });
    fixture.detectChanges();
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal = () => dialog.setAttribute('open', '');
    dialog.close = () => dialog.removeAttribute('open');
    return dialog;
  }

  it('shows the domestic form and opens the result popup after the response', () => {
    const dialog = signIn('D');
    const child = fixture.debugElement.query(By.directive(DomRate)).componentInstance as DomRate;
    expect(child.pageMode).toBe(true);
    expect(fixture.debugElement.query(By.directive(InternationalForm))).toBeNull();
    expect(dialog.hasAttribute('open')).toBe(false);
    Object.assign(child.rateForm, { Prod_Type: 'P', Serv_Type: 'S', Orgn_Code: 'CAI', Dest_Code: 'ALX', Ship_Wght: 2 });
    child.getRate();
    TestBed.inject(HttpTestingController).expectOne(`${baseLink.baseUrl}RateQuery`).flush({ code: '1', JasonString: '[{"Total":125,"TrfAmnt":100,"FSCAmnt":10,"GPAAmnt":5,"TaxAmnt":10}]' });
    fixture.detectChanges();
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.textContent).toContain('125.00');
    expect(fixture.nativeElement.querySelector('.rate-summary')).toBeNull();
    component.closeResult();
    expect(dialog.hasAttribute('open')).toBe(false);
    child.resetForm();
    expect(child.rateForm.Ship_Wght).toBeNull();
  });

  it('shows the international form and displays both currencies in the result popup', () => {
    const dialog = signIn('I');
    const child = fixture.debugElement.query(By.directive(InternationalForm)).componentInstance as InternationalForm;
    expect(child.pageMode).toBe(true);
    expect(fixture.debugElement.query(By.directive(DomRate))).toBeNull();
    child.shipment.patchValue({ product: 'P', country: 'US' });
    child.getRate();
    TestBed.inject(HttpTestingController).expectOne(`${baseLink.baseUrl}RateQueryIntDetailed`).flush({ code: '1', JasonString: '[{"slno":1,"ChargesDescription":"Freight","Amount":10,"AmountBC":500},{"slno":100,"ChargesDescription":"Total Charges","Amount":12,"AmountBC":600}]' });
    fixture.detectChanges();
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(dialog.textContent).toContain('12.00');
    expect(dialog.textContent).toContain('600.00');
    expect(fixture.nativeElement.querySelector('.rate-result')).toBeNull();
    child.resetForm();
    expect(child.shipment.controls.country.value).toBe('');
    expect(child.packages.length).toBe(1);
  });
});
