import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NativeDateModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FormsModule } from '@angular/forms';
import { AppointmentDataTablesComponent } from './components/appointment-data-tables/appointment-data-tables.component';


@NgModule({
  declarations: [
    PatientListComponent,
    SidebarComponent,
    EditProfileComponent,
    DataTableComponent,
    AppointmentDataTablesComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NativeDateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    NgxDatatableModule,
    FormsModule
  ]
})
export class PatientModule { }
