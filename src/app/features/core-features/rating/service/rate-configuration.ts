import { Service, computed, inject } from '@angular/core';
import { AuthState } from '../../../../shared/stats/auth-state';

export interface ApiConfiguration {
  AccountNo: string;
  ActiveDataBase: string;
  UserID: string;
  UserPwd: string;
}

@Service()
export class ApiConfigurationService {
  private readonly auth = inject(AuthState);
  // CoCode is the account number returned by the login API.
  readonly configuration = computed<ApiConfiguration>(() => {
    const account = this.auth.credentials();
    return {
      AccountNo: account?.CoCode ?? '',
      ActiveDataBase: account?.ActiveDataBase || 'IntegraOnTrack',
      UserID: account?.UserID ?? '',
      UserPwd: this.auth.apiPassword(),
    };
  });
  readonly domesticConfiguration = computed<ApiConfiguration>(() => this.auth.isDomesticAccount()
    ? this.configuration()
    : this.auth.isInternationalAccount()
      ? { ...this.configuration(), AccountNo: 'dom14587' }
      // Public guest credentials: explicitly approved for use in the browser.
      : { AccountNo: 'dom14587', ActiveDataBase: 'IntegraOnTrack', UserID: 'test', UserPwd: 'test' });

  withConfiguration<T extends object>(request: T): T & ApiConfiguration {
    return { ...request, ...this.domesticConfiguration() };
  }
}
