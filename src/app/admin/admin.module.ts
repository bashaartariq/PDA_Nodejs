import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { DataTablesForPatientComponent } from './components/data-tables-patient/data-tables-patient.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTabsModule } from '@angular/material/tabs';
import { DataTablesDoctorComponent } from './components/data-tables-doctor/data-tables-doctor.component';
@NgModule({
  declarations: [
    AdminPageComponent,
    DataTablesForPatientComponent,
    DataTablesDoctorComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule,
    NgxDatatableModule,
    MatTabsModule
  ]
})
export class AdminModule { }