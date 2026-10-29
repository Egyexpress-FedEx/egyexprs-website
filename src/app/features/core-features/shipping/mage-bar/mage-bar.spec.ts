import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MageBar } from './mage-bar';
import { provideRouter } from '@angular/router';

describe('MageBar', () => {
  let component: MageBar;
  let fixture: ComponentFixture<MageBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MageBar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MageBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
