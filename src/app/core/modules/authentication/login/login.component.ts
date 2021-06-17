import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/http/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  responseError: string = '';
  onlineOffline: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private utilService: UtilService
  ) {}

  /**
   * ngOnInit() invokes initializeForm() method
   */
  ngOnInit(): void {
    this.initializeForm();
    this.utilService.isApplicationOnline().subscribe((isOnline) => {
      this.onlineOffline = isOnline;
    });
  }

  /**
   * Login form, 'loginForm' is initialized here with two FormControls
   *
   * 1. Email: required
   * 2. Password: required
   */
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        ],
      ],
    });
  }

  /**
   *
   * @param {string} formControlName Name of the form control
   * @returns {string} Error message for any form control
   *
   * This method returns the error message to be displayed in UI when a form control
   * is invalid.
   */
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
      } else if (formControl.hasError('minlength')) {
        return 'Length of password should be atleast 6 characters';
      } else if (formControl.hasError('pattern')) {
        return 'Password: a.	Must have a number and alphabet. b. Cannot have spaces';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  /**
   * This method is called when 'Login' button is clicked in UI.
   *
   * It checks if the loginForm's validity.
   * If the form is valid login API is accessed from AuthService.
   * If the entered credentials are valid, the loginForm is reset and user is redirected to
   * Products Listing Page. Otherwise, relevant error message is shown in UI.
   */
  onLogin() {
    if (this.loginForm.valid) {
      if (this.onlineOffline) {
        const formValue = this.loginForm.value;
        this.authService
          .login(formValue.email, formValue.password)
          .pipe(take(1))
          .subscribe(
            (resp) => {
              this.loginForm.reset();
              this.router.navigate(['products/plp']);
            },
            (error) => {
              this.responseError = error;
            }
          );
      } else {
        this.loginForm.reset();
        this.router.navigate(['products/plp']);
      }
    }
  }
}
