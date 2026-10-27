import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperAccount } from './oper-account';

describe('OperAccount', () => {
  let component: OperAccount;
  let fixture: ComponentFixture<OperAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(OperAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
