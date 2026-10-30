import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { AuthState } from './shared/stats/auth-state';
import { routes } from './app.routes';
import { connectionInterceptor } from './shared/interceptors/connection.interceptor';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => inject(AuthState).ready),
    provideHttpClient(withInterceptors([loadingInterceptor, connectionInterceptor])),
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
    }))
  ]
};
