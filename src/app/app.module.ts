import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegisterModule } from './register/register.module';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NativeDateModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'; // mat-datepicker
import { MatFormFieldModule } from '@angular/material/form-field'; // mat-form-field
import { MatSelectModule } from '@angular/material/select'; // mat-select (for mat-option)
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpinterceptorInterceptor } from './interceptors/httpinterceptor.interceptor';
import { AddinfoModule } from './addinfo/addinfo.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { PageComponent } from './components/page/page.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RegisterModule,
    ReactiveFormsModule,
    MatInputModule,
    NativeDateModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    AddinfoModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpinterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
