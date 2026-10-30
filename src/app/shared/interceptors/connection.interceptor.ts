import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CONNECTION_ERROR_MESSAGE, ConnectionState } from '../stats/connection-state';

class ConnectionHttpError extends HttpErrorResponse {
  override readonly message = CONNECTION_ERROR_MESSAGE;
  constructor(original: HttpErrorResponse) {
    super({ error: { Description: CONNECTION_ERROR_MESSAGE }, headers: original.headers, status: original.status, statusText: original.statusText, url: original.url || undefined });
  }
}

export const connectionInterceptor: HttpInterceptorFn = (request, next) => {
  const connection = inject(ConnectionState);
  return next(request).pipe(catchError((error: unknown) => {
    // Status 0 means the browser could not obtain an HTTP response.
    // Keep server validation/authentication failures separate from connectivity.
    if (error instanceof HttpErrorResponse && error.status === 0) {
      connection.show();
      return throwError(() => new ConnectionHttpError(error));
    }
    return throwError(() => error);
  }));
};
