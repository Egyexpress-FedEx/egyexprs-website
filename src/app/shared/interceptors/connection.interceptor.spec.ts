import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { connectionInterceptor } from './connection.interceptor';
import { loadingInterceptor } from './loading.interceptor';
import { CONNECTION_ERROR_MESSAGE, ConnectionState } from '../stats/connection-state';
import { LoadingState } from '../stats/loading-state';

describe('Global connection handling', () => {
  let http: HttpClient; let controller: HttpTestingController; let connection: ConnectionState;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(withInterceptors([loadingInterceptor, connectionInterceptor])), provideHttpClientTesting()] });
    http = TestBed.inject(HttpClient); controller = TestBed.inject(HttpTestingController); connection = TestBed.inject(ConnectionState);
  });
  afterEach(() => controller.verify());
  it('opens a connection notice and replaces raw HTTP text while completing the request', () => {
    let received: HttpErrorResponse | undefined;
    http.get('/some-private-endpoint').subscribe({ error: error => received = error });
    controller.expectOne('/some-private-endpoint').error(new ProgressEvent('error'));
    expect(connection.visible()).toBe(true);
    expect(received?.message).toBe(CONNECTION_ERROR_MESSAGE);
    expect(received?.error.Description).toBe(CONNECTION_ERROR_MESSAGE);
    expect(received?.message).not.toContain('some-private-endpoint');
    expect(TestBed.inject(LoadingState).isLoading()).toBe(false);
    controller.expectNone('/some-private-endpoint');
  });
  it('preserves server validation errors and does not label them as internet failures', () => {
    let received: HttpErrorResponse | undefined;
    http.post('/booking', {}).subscribe({ error: error => received = error });
    controller.expectOne('/booking').flush({ Description: 'City is required' }, { status: 400, statusText: 'Bad Request' });
    expect(received?.error.Description).toBe('City is required');
    expect(connection.visible()).toBe(false);
  });
  it('keeps one visible notice for concurrent network failures and permits dismissal', () => {
    http.get('/cities').subscribe({ error: () => undefined });
    http.get('/services').subscribe({ error: () => undefined });
    controller.expectOne('/cities').error(new ProgressEvent('error'));
    controller.expectOne('/services').error(new ProgressEvent('error'));
    expect(connection.visible()).toBe(true);
    connection.dismiss(); expect(connection.visible()).toBe(false);
  });
});
