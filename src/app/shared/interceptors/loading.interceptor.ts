import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingState } from '../stats/loading-state';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
  const loadingState = inject(LoadingState);

  loadingState.start();

  return next(request).pipe(
    finalize(() => loadingState.stop()),
  );
};
