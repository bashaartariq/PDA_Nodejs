import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { LandingComponent } from './landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NativeDateModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; // mat-datepicker
import { MatFormFieldModule } from '@angular/material/form-field'; // mat-form-field
import { MatSelectModule } from '@angular/material/select';
import { PageComponent } from './components/page/page.component'; // mat-select (for mat-option)


@NgModule({
  declarations: [
    LandingComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MatInputModule,MatButtonModule,
    MatIconModule,
    NativeDateModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class RegisterModule { }
