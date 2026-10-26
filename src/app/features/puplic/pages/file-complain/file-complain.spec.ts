import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileComplain } from './file-complain';

describe('FileComplain', () => {
  let component: FileComplain;
  let fixture: ComponentFixture<FileComplain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileComplain],
    }).compileComponents();

    fixture = TestBed.createComponent(FileComplain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
