import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Nav } from './nav';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

describe('Nav', () => {
  let component: Nav;
  let fixture: ComponentFixture<Nav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nav], providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('filters shortcuts regardless of spaces or case', () => {
    component.searchQuery.set('CONTACT US');
    expect(component.filteredRecommendations().map(item => item.label)).toEqual(['ContactUs']);
  });

  it('navigates to the same shortcut on form submission', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.searchOpen.set(true);
    component.searchQuery.set('Get rate');
    component.submitSearch(new Event('submit', { cancelable: true }));
    expect(navigate).toHaveBeenCalledWith(['/home'], { queryParams: { destination: 'get-rate' } });
    expect(component.searchOpen()).toBe(false);
  });

  it('keeps search open without navigating for empty or unmatched queries', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.searchOpen.set(true);
    for (const query of ['', 'no-such-destination']) {
      component.searchQuery.set(query);
      component.submitSearch(new Event('submit', { cancelable: true }));
    }
    expect(navigate).not.toHaveBeenCalled();
    expect(component.searchOpen()).toBe(true);
  });});
