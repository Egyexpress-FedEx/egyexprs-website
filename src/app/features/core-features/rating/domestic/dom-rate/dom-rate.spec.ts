import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthState } from '../../../../../shared/stats/auth-state';
import { baseLink } from '../../../../../base/baseUrl';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomRate } from './dom-rate';

describe('DomRate', () => {
  let component: DomRate;
  let fixture: ComponentFixture<DomRate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
      imports: [DomRate],
    }).compileComponents();

    fixture = TestBed.createComponent(DomRate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function signIn() {
    TestBed.inject(AuthState).setCredentials({
      CoCode: 'DOM-TEST', DivCode: '', ShipmentType: 'D', UserID: 'test-user',
      UserPWD: 'test-password', UserName: 'Test', UserTag: '', UserType: '',
    });
  }

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    TestBed.inject(AuthState).clearCredentials();
  });

  it('uses CoCode as AccountNo and the entered weight in the reference RateQuery payload', () => {
    signIn();
    Object.assign(component.rateForm, { Prod_Type: 'P', Serv_Type: 'S', Orgn_Code: 'CAI', Dest_Code: 'ALX', Ship_Wght: 3.5, width: 100, numberOfPieces: 2 });
    component.getRate();
    const request = TestBed.inject(HttpTestingController).expectOne(`${baseLink.baseUrl}RateQuery`);
    expect(request.request.body).toEqual({
      AccountNo: 'DOM-TEST', ActiveDataBase: 'IntegraOnTrack', UserID: 'test-user', UserPwd: 'test-password',
      Prod_Type: 'P', Serv_Type: 'S', Orgn_Code: 'CAI', Dest_Code: 'ALX', Ship_Wght: 3.5,
    });
    const rate = { TrfAmnt: 100, FSCAmnt: 10, GPAAmnt: 5, TaxAmnt: 16.1, Total: 131.1 };
    request.flush({ code: '1', Description: 'SUCCESS', JasonString: JSON.stringify([rate]) });
    expect(component.result()).toEqual(rate);
    expect(component.loading()).toBe(false);
  });

  it('does not send requests for incomplete shipment data', () => {
    signIn();
    component.getRate();
    expect(component.error()).toContain('Complete all shipment fields');
    TestBed.inject(HttpTestingController).expectNone(`${baseLink.baseUrl}RateQuery`);
  });

  it('loads the domestic product, service and city lists using the source filters', () => {
    signIn();
    const http = TestBed.inject(HttpTestingController);
    component.dropdowns.loadProducts();
    const product = http.expectOne(`${baseLink.baseUrl}MasterList`);
    expect(product.request.body.MasterType).toBe('PROD');
    product.flush({ Code: '101', Response: [{ cl_CodeID: 'P', cl_CodeName: 'Parcel' }] });
    component.dropdowns.loadServices();
    const service = http.expectOne(`${baseLink.baseUrl}MasterListFilter`);
    expect(service.request.body.Filter).toBe(" and Category<>'I'");
    service.flush({ Code: '101', Response: [] });
    component.dropdowns.loadCities();
    const cities = http.expectOne(`${baseLink.baseUrl}GetCityListFilterWise`);
    expect(cities.request.body.Filter).toBe("CodeType='CITY' and AreaCode='EG' ");
    cities.flush({ Code: '101', Response: [] });
    expect(component.dropdowns.products()[0].cl_CodeName).toBe('Parcel');
  });

  it('shows API errors and re-enables the check button', () => {
    signIn();
    Object.assign(component.rateForm, { Prod_Type: 'P', Serv_Type: 'S', Orgn_Code: 'CAI', Dest_Code: 'ALX', Ship_Wght: 1 });
    component.getRate();
    TestBed.inject(HttpTestingController).expectOne(`${baseLink.baseUrl}RateQuery`).flush({ code: '0', Description: 'Rate unavailable', JasonString: '' });
    expect(component.error()).toBe('Rate unavailable');
    expect(component.loading()).toBe(false);
    expect(component.result()).toBeNull();
  });

  it('uses the international customer login with the retail account for domestic rates', () => {
    TestBed.inject(AuthState).setCredentials({
      CoCode: 'INT-TEST', DivCode: '', ShipmentType: 'I', UserID: 'international-user',
      UserPWD: 'customer-password', UserName: 'Test', UserTag: '', UserType: '',
    });
    Object.assign(component.rateForm, { Prod_Type: 'P', Serv_Type: 'S', Orgn_Code: 'CAI', Dest_Code: 'ALX', Ship_Wght: 1 });
    component.getRate();
    const http = TestBed.inject(HttpTestingController);
    const request = http.expectOne(`${baseLink.baseUrl}RateQuery`);
    expect(request.request.body.AccountNo).toBe('dom14587');
    expect(request.request.body.UserID).toBe('international-user');
    expect(request.request.body.UserPwd).toBe('customer-password');
    request.flush({ code: '1', JasonString: '[{"Total":100}]' });
    component.dropdowns.loadProducts();
    const products = http.expectOne(`${baseLink.baseUrl}MasterList`);
    expect(products.request.body.UserId).toBe('international-user');
    expect(products.request.body.UserPwd).toBe('customer-password');
    products.flush({ Code: '101', Response: [] });
  });

  it('uses the public guest credentials and retail account on the existing domestic endpoint', () => {
    TestBed.inject(AuthState).clearCredentials();
    Object.assign(component.rateForm, { Prod_Type: 'P', Serv_Type: 'S', Orgn_Code: 'CAI', Dest_Code: 'ALX', Ship_Wght: 1 });
    component.getRate();
    const http = TestBed.inject(HttpTestingController);
    const request = http.expectOne(`${baseLink.baseUrl}RateQuery`);
    expect(request.request.body).toEqual({
      AccountNo: 'dom14587', ActiveDataBase: 'IntegraOnTrack', UserID: 'test', UserPwd: 'test',
      Prod_Type: 'P', Serv_Type: 'S', Orgn_Code: 'CAI', Dest_Code: 'ALX', Ship_Wght: 1,
    });
    request.flush({ code: '1', JasonString: '[{"Total":100}]' });
    expect(component.result()?.Total).toBe(100);
    expect(TestBed.inject(AuthState).isLoggedIn()).toBe(false);
    component.dropdowns.loadProducts();
    const products = http.expectOne(`${baseLink.baseUrl}MasterList`);
    expect(products.request.body.UserId).toBe('test');
    expect(products.request.body.UserPwd).toBe('test');
    products.flush({ Code: '101', Response: [] });
  });

  for (const scenario of [
    { actual: 2, length: 50, width: 40, height: 30, expected: 12 },
    { actual: 20, length: 50, width: 40, height: 30, expected: 20 },
    { actual: 12, length: 50, width: 40, height: 30, expected: 12 },
    { actual: 3, length: null, width: null, height: null, expected: 3 },
  ]) {
    it(`sends chargeable weight ${scenario.expected} for actual weight ${scenario.actual} and the entered dimensions`, () => {
      TestBed.inject(AuthState).clearCredentials();
      Object.assign(component.rateForm, { Prod_Type: 'P', Serv_Type: 'S', Orgn_Code: 'CAI', Dest_Code: 'ALX',
        Ship_Wght: scenario.actual, length: scenario.length, width: scenario.width, height: scenario.height });
      component.getRate();
      const request = TestBed.inject(HttpTestingController).expectOne(`${baseLink.baseUrl}RateQuery`);
      expect(request.request.body.Ship_Wght).toBe(scenario.expected);
      request.flush({ code: '1', JasonString: '[{"Total":100}]' });
    });
  }
});
