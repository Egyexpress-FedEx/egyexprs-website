import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPrivacy } from './privacy-privacy';

describe('PrivacyPrivacy', () => {
  let component: PrivacyPrivacy;
  let fixture: ComponentFixture<PrivacyPrivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPrivacy],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPrivacy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
