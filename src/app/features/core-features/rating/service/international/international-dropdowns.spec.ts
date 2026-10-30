import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthState } from '../../../../../shared/stats/auth-state';
import { InternationalDropdowns } from './international-dropdowns';

describe('International product direction changes', () => {
  let dropdowns: InternationalDropdowns; let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    const auth = TestBed.inject(AuthState); auth.clearCredentials();
    void auth.setCredentials({ CoCode: 'A', DivCode: '', ShipmentType: 'I', UserID: 'user', UserPWD: 'password', UserName: 'User', UserTag: '', UserType: '' });
    dropdowns = TestBed.inject(InternationalDropdowns); http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => { http.verify(); TestBed.inject(AuthState).clearCredentials(); });
  it('cancels import loading when export is selected and shows only export products', () => {
    dropdowns.loadProductClassifications('IMPORT');
    const old = http.expectOne(request => request.url.endsWith('MasterListFilter'));
    dropdowns.loadProductClassifications('EXPORT');
    expect(old.cancelled).toBe(true);
    const current = http.expectOne(request => request.url.endsWith('MasterListFilter'));
    expect(current.request.body.Filter).toContain("codename like 'EXPORT%'");
    current.flush({ Code: '101', Response: [{ cl_CodeID: 'EXPORT1', cl_CodeName: 'EXPORT PRODUCT' }] });
    expect(dropdowns.productClassifications().map(product => product.cl_CodeID)).toEqual(['EXPORT1']);
    expect(dropdowns.productClassificationsLoading()).toBe(false);
  });
  it('clears and cancels an in-flight product request', () => {
    dropdowns.loadProductClassifications('IMPORT');
    const request = http.expectOne(request => request.url.endsWith('MasterListFilter'));
    dropdowns.clearProductClassifications();
    expect(request.cancelled).toBe(true); expect(dropdowns.productClassifications()).toEqual([]);
    expect(dropdowns.productClassificationsLoading()).toBe(false);
  });
  it('does not duplicate the same in-flight request or reload an empty successful list', () => {
    dropdowns.loadProductClassifications('EXPORT'); dropdowns.loadProductClassifications('EXPORT');
    http.expectOne(request => request.url.endsWith('MasterListFilter')).flush({ Code: '101', Response: [] });
    dropdowns.loadProductClassifications('EXPORT'); http.expectNone(request => request.url.endsWith('MasterListFilter'));
  });
});
