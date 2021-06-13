import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})

/**
 * AuthenticationModule contains the components and models
 * required for registering and logging the user into the application.
 *
 * It has LoginComponent and SignupComponent and the routes required
 * to navigate between login and signup page.
 */
export class AuthenticationModule {}
