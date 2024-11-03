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
import { MatTooltipModule } from '@angular/material/tooltip';
import { PDFComponent } from './components/pdf/pdf.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AdminPageComponent,
    DataTablesForPatientComponent,
    DataTablesDoctorComponent,
    PDFComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    NgxDatatableModule,
    MatTabsModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class AdminModule { }