import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registretion } from './registretion';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Registertion } from '../../services/registertion';

describe('Registretion', () => {
  let component: Registretion;
  let fixture: ComponentFixture<Registretion>;
  const service = {
    getaccountDetials: vi.fn(),
    getcity: vi.fn(),
    registerNow: vi.fn(),
  };

  beforeEach(async () => {
    vi.resetAllMocks();
    service.getaccountDetials.mockReturnValue(of({ Code: '1', CustomerDetails: { cl_CustName: 'Test Company' } }));
    service.registerNow.mockReturnValue(of({ Code: '1', Description: 'SUCCESS' }));
    await TestBed.configureTestingModule({
      imports: [Registretion],
      providers: [provideRouter([]), { provide: Registertion, useValue: service }],
    }).compileComponents();

    fixture = TestBed.createComponent(Registretion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function fillForm() {
    component.form.patchValue({ accountNumber: 'D77777', email: 'newtest', fullName: 'Ahmed Sami', password: '123n', contactPerson: 'Ahmed Sami', address: 'Cairo', address2: 'Office 2', city: 'CAI', telephone: '0212345678', mobile: '01018097608', contactEmail: 'test@example.com' });
    component.cities.set([{ cl_AreaCode: 'EG', cl_CodeID: 'CAI', cl_CodeName: 'CAIRO', cl_CodeType: null, cl_TelStart: null, cl_ZipStart: null }]);
    component.lookupAccount();
  }

  it('sends form values with the city code and shows the exact activation message', () => {
    fillForm();
    component.register();
    expect(service.registerNow).toHaveBeenCalledWith(expect.objectContaining({
      Database: 'IntegraOnTrack', UserID: 'test', UserPwd: '123',
      OnlineUserMastData: expect.objectContaining({ cl_Accno: 'D77777', cl_UserID: 'newtest', cl_PWDAC: '123n', cl_CustName: 'Test Company', cl_CustCity: 'CAI', cl_CustCityName: 'CAIRO', cl_CustEMail: 'test@example.com', cl_CustAddress1: 'Office 2' }),
    }));
    expect(component.registered()).toBe(true);
    expect(Object.values(component.form.getRawValue()).every(value => value === '')).toBe(true);
    expect(component.form.pristine).toBe(true);
    expect(component.submitted()).toBe(false);
    expect(component.notice()).toBe('Details registered inside local ledger system. Egypt Express IT systems desk operations will review and trigger activation soon.');
    component.register();
    expect(service.registerNow).toHaveBeenCalledTimes(1);
  });

  it('shows server rejection without treating it as successful registration', () => {
    fillForm();
    service.registerNow.mockReturnValue(of({ Code: '-1', Description: 'User already exists' }));
    component.register();
    expect(component.registered()).toBe(false);
    expect(component.notice()).toBe('User already exists');
    expect(component.registering()).toBe(false);
  });
});
