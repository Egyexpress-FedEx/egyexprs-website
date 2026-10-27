import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConditionsCarriage } from './conditions-carriage';

describe('ConditionsCarriage', () => {
  let component: ConditionsCarriage;
  let fixture: ComponentFixture<ConditionsCarriage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionsCarriage],
    }).compileComponents();

    fixture = TestBed.createComponent(ConditionsCarriage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
