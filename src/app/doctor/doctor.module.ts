import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import {  MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    DashboardComponent,
    DataTablesComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    MatCardModule,
    MatIconModule,
    NgxDatatableModule,
    MatTooltipModule
  ]
})
export class DoctorModule { }
