import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Belogs } from './belogs';

describe('Belogs', () => {
  let component: Belogs;
  let fixture: ComponentFixture<Belogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Belogs],
    }).compileComponents();

    fixture = TestBed.createComponent(Belogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
