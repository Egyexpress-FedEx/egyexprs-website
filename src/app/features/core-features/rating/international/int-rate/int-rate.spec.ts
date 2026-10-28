import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntRate } from './int-rate';

describe('IntRate', () => {
  let component: IntRate;
  let fixture: ComponentFixture<IntRate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
      imports: [IntRate],
    }).compileComponents();

    fixture = TestBed.createComponent(IntRate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
