import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddinfoRoutingModule } from './addinfo-routing.module';
import { PatientinfoComponent } from './components/patientinfo/patientinfo.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
 
import { MatNativeDateModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { CasesComponent } from './components/cases/cases.component';

@NgModule({
  declarations: [
    PatientinfoComponent,
    StepperComponent,
    AppointmentComponent,
    CasesComponent,
  ],
  imports: [
    CommonModule,
    AddinfoRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule,
    MatStepperModule
  ]
})
export class AddinfoModule { }
