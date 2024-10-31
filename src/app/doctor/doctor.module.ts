import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import {  MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NativeDateModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DashboardComponent,
    DataTablesComponent
   ],
  imports: [
    CommonModule,
    NativeDateModule,
    DoctorRoutingModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgxDatatableModule,
    MatDatepickerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,


  ]
})
export class DoctorModule { }
