import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
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

    this.loading.set(true);
    this.loginService.login({
      UserID: this.form.controls.userId.value.trim(),
      UserPwd: this.form.controls.password.value,
    }).pipe(
      finalize(() => this.loading.set(false)),
    ).subscribe({
      next: response => {
        if (response.Code === '-1' || !response.UserCredentials) {
          this.notice.set(response.Description || 'Invalid Credentials');
          return;
        }

        this.authState.setCredentials(response.UserCredentials, this.form.controls.remember.value, this.form.controls.password.value);
        this.form.controls.password.reset();
        void this.router.navigateByUrl('/home');
      },
      error: error => {
        this.notice.set(error.error?.Description || 'We could not sign you in. Please try again.');
      },
    });
  }
}
