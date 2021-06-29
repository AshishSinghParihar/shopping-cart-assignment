import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/http/auth.service';
import { CommonUtilService } from 'src/app/core/services/common-util/common-util.service';
import { User } from '../../model/user';

/**
 * The SignupComponent is responsible for registering a user into the database.
 * Currently, we are using Firebase API for storing the records.
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

/**
 * @implements OnInit
 */
export class SignupComponent implements OnInit {
  /**
   * FormGroup to store FormControls for signup form
   */
  signupForm: FormGroup;

  /**
   * Stores the error messages from server
   */
  responseError: string = '';

  /**
   * Variable to store `true` if internet connection is available else `false`
   */
  onlineOffline: boolean;

  /**
   * Dependencies are injected in the constructor
   *
   * @param formBuilder {FormBuilder} Used to initialize login form
   * @param router {Router} Used to navigate from one path to another
   * @param authService {AuthService} Used to perform HTTP calls for storing user credentials
   * @param utilService {CommonUtilService} Used to envoke common/shared functions
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private utilService: CommonUtilService
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
   * Signup form, `signupForm` is initialized here with five FormControls
   *
   * 1. First name: required
   * 2. Last name: required
   * 3. Email: required
   * 4. Password: required
   * 5. Confirm password: required
   */
  initializeForm() {
    this.signupForm = this.formBuilder.group(
      {
        fName: [null, [Validators.required]],
        lName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
          ]
        ],
        cnfPassword: [null, [Validators.required]]
      },
      {
        validator: this.cnfPasswordValidator()
      }
    );
  }

  /**
   * This method returns the error message to be displayed in UI when a form control
   * is invalid.
   *
   * @param {string} formControlName Name of the form control
   * @returns {string} Error message for any form control
   */
  getErrorMessage(formControlName: string) {
    const formControl = this.signupForm.get(formControlName);

    if (formControlName === 'fName' && formControl?.invalid) {
      if (formControl.hasError('required')) {
        return 'First name is required';
      } else {
        return '';
      }
    } else if (formControlName === 'lName' && formControl?.invalid) {
      if (formControl.hasError('required')) {
        return 'Last name is required';
      } else {
        return '';
      }
    } else if (formControlName === 'email' && formControl?.invalid) {
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
    } else if (formControlName === 'cnfPassword' && formControl?.invalid) {
      if (formControl.hasError('required')) {
        return 'Confirm password is required';
      } else if (formControl.hasError('passwordMismatch')) {
        return 'Passwords do not match';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  /**
   * This method is envoked when `Signup` button is clicked in UI.
   *
   * It validates `signupForm`. If valid, the form values are sent to signup API through AuthService.
   * If the process is successful, the 'signupForm' is reset and user is redirected to Login Page.
   * Otherwise, relevant error message is displayed in UI.
   */
  onSignup() {
    if (this.signupForm.valid) {
      if (this.onlineOffline) {
        const formValue: User = this.signupForm.value;
        const user = new User(
          formValue.fName,
          formValue.lName,
          formValue.email,
          formValue.password
        );
        this.authService
          .signup(user)
          .pipe(take(1))
          .subscribe(
            (resp: any) => {
              this.utilService.openSnackBar(
                'User registered successfully',
                'Okay'
              );
              this.signupForm.reset();
              this.router.navigate(['authentication/login']);
            },
            (error: string) => {
              this.responseError = error;
            }
          );
      } else {
        this.signupForm.reset();
        this.router.navigate(['authentication/login']);
      }
    }
  }

  /**
   * This is a custom validator to validate if the entered password matches with the password in
   * Confirm password field.
   * 
   * @returns Error object if values of `password` and `cnfPassword` do not match else null.
   */
  cnfPasswordValidator() {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls['password'];
      const confirmPasswordControl = formGroup.controls['cnfPassword'];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    };
  }
}
