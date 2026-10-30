import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternationalForm } from './international-form';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthState } from '../../../../../shared/stats/auth-state';
import { baseLink } from '../../../../../base/baseUrl';

describe('International package rows', () => {
  let fixture: ComponentFixture<InternationalForm>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InternationalForm], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    fixture = TestBed.createComponent(InternationalForm);
    fixture.detectChanges();
  });
  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    TestBed.inject(AuthState).clearCredentials();
  });
  function setBoxes(value: string) {
    const input = fixture.nativeElement.querySelector('#int-boxes') as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    return input;
  }
  it('renders one editable row for each requested box and preserves existing values', () => {
    fixture.componentInstance.packages.at(0).controls.length.setValue(25);
    setBoxes('12');
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(12);
    expect(fixture.componentInstance.packages.at(0).controls.length.value).toBe(25);
    setBoxes('3');
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(3);
  });
  it('deletes the selected row and synchronizes the box count', () => {
    setBoxes('3');
    fixture.componentInstance.packages.at(2).controls.width.setValue(40);
    fixture.nativeElement.querySelector('[aria-label="Delete box 2"]').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.packages.at(1).controls.width.value).toBe(40);
    expect(fixture.nativeElement.querySelector('#int-boxes').value).toBe('2');
  });
  it('keeps at least one box and rejects fractional counts', () => {
    setBoxes('0');
    expect(fixture.componentInstance.packages.length).toBe(1);
    const input = setBoxes('2.5');
    expect(fixture.componentInstance.packages.length).toBe(1);
    input.dispatchEvent(new Event('blur'));
    expect(input.value).toBe('2.5');
    expect(fixture.componentInstance.boxCountError()).toBeTruthy();
    fixture.componentInstance.removeBox(0);
    expect(fixture.componentInstance.packages.length).toBe(1);
  });
  it('updates chargeable weight as dimensions and actual weights change', () => {
    fixture.componentInstance.packages.at(0).setValue({ length: 50, width: 40, height: 30, actualWeight: 2 });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#int-chargeable').value).toBe('12');
    fixture.componentInstance.resetBox(0);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#int-chargeable').value).toBe('0.5');
  });
  it('rejects huge counts before allocating rows and blocks pricing until corrected', () => {
    setBoxes('999999999');
    expect(fixture.componentInstance.packages.length).toBe(1);
    expect(fixture.componentInstance.boxCountError()).toContain('100');
    expect(fixture.nativeElement.querySelector('.check-rates').disabled).toBe(true);
    fixture.componentInstance.getRate();
    TestBed.inject(HttpTestingController).expectNone(`${baseLink.baseUrl}RateQueryIntDetailed`);
    setBoxes('2');
    expect(fixture.componentInstance.packages.length).toBe(2);
    expect(fixture.componentInstance.boxCountError()).toBe('');
  });
  it('updates the maximum box count in a single value change', () => {
    let updates = 0;
    fixture.componentInstance.packages.valueChanges.subscribe(() => updates++);
    setBoxes('100');
    expect(fixture.componentInstance.packages.length).toBe(100);
    expect(updates).toBe(1);
    setBoxes('1');
    expect(updates).toBe(2);
  });

  function signIn() {
    TestBed.inject(AuthState).setCredentials({
      CoCode: 'INT-TEST', DivCode: '', ShipmentType: 'I', UserID: 'test-user',
      UserPWD: 'test-password', UserName: 'Test', UserTag: '', UserType: '',
    });
  }

  for (const direction of ['IMPORT', 'EXPORT'] as const) {
    it(`matches the reference ${direction} payload, weights, package data and returned totals`, () => {
      signIn();
      const form = fixture.componentInstance;
      form.shipment.controls.direction.setValue(direction);
      const http = TestBed.inject(HttpTestingController);
      const products = http.expectOne(`${baseLink.baseUrl}MasterListFilter`);
      expect(products.request.body.Filter).toBe(` and Category='I' and codename like '${direction}%'`);
      products.flush({ Code: '101', Response: [] });
      form.shipment.patchValue({ product: 'SERV1', country: 'US', city: ' Boston ', zipCode: ' 02108 ' });
      form.packages.at(0).setValue({ length: 50, width: 40, height: 30, actualWeight: 2 });
      setBoxes('2');
      form.packages.at(1).controls.actualWeight.setValue(5);
      form.getRate();
      const request = http.expectOne(`${baseLink.baseUrl}RateQueryIntDetailed`);
      expect(request.request.body).toEqual({
        AccountNo: 'INT-TEST', ActiveDataBase: 'IntegraOnTrack', UserID: 'test-user', UserPwd: 'test-password',
        Orgn_Code: direction === 'EXPORT' ? 'EG' : 'US', Dest_Code: direction === 'EXPORT' ? 'US' : 'EG',
        Serv_Type: '', Prod_Type: 'SERV1', Ship_Wght: 17, Dimension: '', Sl1: 'Boston', Sl2: '02108', Sl3: 2,
        AWBPackageData: [
          { cl_AWBNo: '', cl_PkgId: '', cl_PCs: '', cl_DimL: '50', cl_DimW: '40', cl_DimH: '30' },
          { cl_AWBNo: '', cl_PkgId: '', cl_PCs: '', cl_DimL: '0', cl_DimW: '0', cl_DimH: '0' },
        ],
      });
      request.flush({ code: '1', JasonString: JSON.stringify([
        { slno: 1, ChargesDescription: 'Freight', Amount: 10, AmountBC: 500 },
        { slno: 100, ChargesDescription: 'Total Charges', Amount: 12, AmountBC: 600 },
      ]) });
      expect(form.result()?.totalUsd).toBe(12);
      expect(form.result()?.totalEgp).toBe(600);
      expect(form.result()?.charges.length).toBe(1);
      expect(form.loading()).toBe(false);
    });
  }

  it('uses the source country filter and reports API failures', () => {
    signIn();
    const form = fixture.componentInstance;
    form.dropdowns.loadCountries();
    const http = TestBed.inject(HttpTestingController);
    const countries = http.expectOne(`${baseLink.baseUrl}GetCountryList`);
    expect(countries.request.body.Filter).toBe(" codeid<>'EG'");
    countries.flush({ Code: '101', Response: [] });
    form.shipment.patchValue({ product: 'SERV1', country: 'US' });
    form.getRate();
    http.expectOne(`${baseLink.baseUrl}RateQueryIntDetailed`).flush({ code: '0', Description: 'Rate unavailable' });
    expect(form.error()).toBe('Rate unavailable');
    expect(form.loading()).toBe(false);
  });
  it('cancels pricing when a shipment field changes and emits only the current quote', () => {
    signIn(); const form = fixture.componentInstance; const emitted: number[] = [];
    form.rateCalculated.subscribe(rate => emitted.push(rate.totalUsd));
    form.shipment.patchValue({ product: 'SERV1', country: 'US' });
    form.getRate(); const http = TestBed.inject(HttpTestingController);
    const old = http.expectOne(baseLink.baseUrl + 'RateQueryIntDetailed');
    form.shipment.controls.country.setValue('GB');
    expect(old.cancelled).toBe(true); expect(form.loading()).toBe(false);
    form.getRate(); const current = http.expectOne(baseLink.baseUrl + 'RateQueryIntDetailed');
    expect(current.request.body.Orgn_Code).toBe('GB');
    current.flush({ code: '1', JasonString: '[{"slno":100,"ChargesDescription":"Total Charges","Amount":20,"AmountBC":1000}]' });
    expect(emitted).toEqual([20]);
  });
  it('cancels pricing when package inputs or an invalid box count change', () => {
    signIn(); const form = fixture.componentInstance; const http = TestBed.inject(HttpTestingController);
    form.shipment.patchValue({ product: 'SERV1', country: 'US' }); form.getRate();
    const old = http.expectOne(baseLink.baseUrl + 'RateQueryIntDetailed');
    form.packages.at(0).controls.actualWeight.setValue(20); expect(old.cancelled).toBe(true);
    form.getRate(); const current = http.expectOne(baseLink.baseUrl + 'RateQueryIntDetailed');
    setBoxes('2.5'); expect(current.cancelled).toBe(true); expect(form.result()).toBeNull();
  });

});
