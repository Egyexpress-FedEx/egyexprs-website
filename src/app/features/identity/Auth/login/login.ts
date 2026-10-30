import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { concatMap, finalize, from, map, of } from 'rxjs';
import { Login as LoginService } from '../../services/login';
import { AuthState } from '../../../../shared/stats/auth-state';

@Component({
  imports: [ReactiveFormsModule , RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly loginService = inject(LoginService);
  private readonly authState = inject(AuthState);
  private readonly router = inject(Router);

  readonly showPassword = signal(false);
  readonly submitted = signal(false);
  readonly loading = signal(false);
  readonly notice = signal('');
  readonly form = new FormGroup({
    userId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    remember: new FormControl(false, { nonNullable: true }),
  });

  invalid(field: 'userId' | 'password') {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  signIn(): void {
    if (this.loading()) return;

    this.submitted.set(true);
    this.notice.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    this.loading.set(true);
    this.loginService.login({
      UserID: values.userId.trim(),
      UserPwd: values.password,
    }).pipe(
      concatMap(response => response.Code === '-1' || !response.UserCredentials ? of(response) :
        from(this.authState.setCredentials(response.UserCredentials, values.remember, values.password)).pipe(map(() => response))),
      finalize(() => this.loading.set(false)),
    ).subscribe({
      next: response => {
        if (response.Code === '-1' || !response.UserCredentials) {
          this.notice.set(response.Description || 'Invalid Credentials');
          return;
        }

        this.form.controls.password.reset();
        void this.router.navigateByUrl('/home');
      },
      error: error => {
        this.notice.set(error.error?.Description || 'We could not sign you in. Please try again.');
      },
    });
  }
}
