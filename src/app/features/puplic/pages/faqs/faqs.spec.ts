import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FAQS } from './faqs';

describe('FAQS', () => {
  let component: FAQS;
  let fixture: ComponentFixture<FAQS>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FAQS],
    }).compileComponents();

    fixture = TestBed.createComponent(FAQS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
