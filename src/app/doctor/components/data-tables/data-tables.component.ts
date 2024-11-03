import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppointmentComponent } from 'src/app/addinfo/components/appointment/appointment.component';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {
  selectedCaseAppointments: any = [];
  selectAppointmentCase: any = [];
  page: number = 0;
  pageSize: number = 5;

  appointmentForm: any = FormGroup;
  constructor(private service: AuthService, private dialog: MatDialog, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.getAppointments();
    this.initializeAppointmentForm();
  }
  initializeAppointmentForm(): void {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      appointmentType: ['', Validators.required],
      speciality: ['', Validators.required],
      doctor: ['', Validators.required],
      location: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['']
    });
  }
  viewCases(row: any) {
    this.service.getAppointmentCase(row.id).subscribe((result) => {
      console.log(result);
      this.selectAppointmentCase = [result];
    }, (err) => {
      console.log(err);
    });
  }


  getAppointments(): void {
    const user_id = this.service.decodeToken()?.userId;
    if (user_id) {
      this.service.getDoctorAppointment(user_id).subscribe((response) => {
        this.selectedCaseAppointments = response[0].appointment;
        console.log(this.selectedCaseAppointments);
      }, (err) => { });
    }
  }

  editAppointment(row: any) {
    console.log(row);
    const dialogRef = this.dialog.open(AppointmentComponent, {
      panelClass: 'custom-dialog-container',
      height: 'auto',
      maxHeight: '80vh',
      width: '600px',
    });
    dialogRef.componentInstance.appointmentForm = this.appointmentForm;
    dialogRef.componentInstance.formSubmit.subscribe((formValues: any) => {
      this.onFormSubmitAppointmentEdit(formValues, row.id);
      dialogRef.close();
    });
  }

  onFormSubmitAppointmentEdit(formValues: any, appointment_id: number) {
    console.log(formValues, appointment_id);
    this.service.updateAppointment(formValues, appointment_id).subscribe((response: any) => {
      alert(response.message);
    }, (err: any) => {
      alert(err.error.message);
    });
  }

  nextPage() {
    if (this.page < this.selectedCaseAppointments.length / this.pageSize - 1) {
      this.page++;
    }
  }
  previousPage() {
    if (this.page > 0) {
      this.page--;
    }
  }
}