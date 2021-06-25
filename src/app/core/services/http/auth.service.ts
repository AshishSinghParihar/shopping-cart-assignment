import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../../model/auth-response';

import { User } from '../../model/user';

const FIREBASE_AUTH_API = 'https://identitytoolkit.googleapis.com/v1/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authErrorCodes: { [key: string]: string } = {
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER:
      'We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND:
      'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD:
      'The password is invalid or the user does not have a password.',
    USER_DISABLED: 'The user account has been disabled by an administrator.',
    TOKEN_EXPIRED:
      "The user's credential is no longer valid. The user must sign in again.",
  };

  constructor(private http: HttpClient) {}

  signup(user: User) {
    return this.http
      .post<AuthResponse>(
        FIREBASE_AUTH_API + 'accounts:signUp?key=' + environment.firebaseAPIKey,
        user
      )
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        FIREBASE_AUTH_API +
          'accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError.bind(this)));
  }

  private getAuthErrorMsg(errorCode: string): string {
    if (this._authErrorCodes.hasOwnProperty(errorCode)) {
      return this._authErrorCodes[errorCode];
    } else {
      return 'An unknown error occurred.';
    }
  }

  private handleError(errorResp: HttpErrorResponse) {
    let errorMsg: string = 'An unknown error occurred.';
    if (
      !errorResp.error ||
      !errorResp.error.error ||
      !errorResp.error.error.message
    ) {
      return throwError(errorMsg);
    } else {
      errorMsg = this.getAuthErrorMsg(errorResp.error.error.message);
      return throwError(errorMsg);
    }
  }
}
