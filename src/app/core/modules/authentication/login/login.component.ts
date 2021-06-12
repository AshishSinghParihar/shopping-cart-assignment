import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/http/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  responseError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  getErrorMessage(formControlName: string) {
    const formControl = this.loginForm.get(formControlName);

    if (formControlName === 'email' && formControl?.invalid) {
      if (formControl.hasError('required')) {
        return 'Email is required';
      } else if (formControl.hasError('email')) {
        return 'Not a valid Email';
      } else {
        return '';
      }
    } else if (formControlName === 'password' && formControl?.invalid) {
      if (formControl.hasError('required')) {
        return 'Password is required';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      // this.router.navigate(['products/plp']);
      this.authService.login(formValue.email, formValue.password).pipe(take(1)).subscribe(
        (resp) => {
          this.loginForm.reset();
          this.router.navigate(['products/plp']);
        },
        (error) => {
          this.responseError = error;
        }
      );
    }
  }
}
