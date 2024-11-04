import { Component, OnInit, Input } from '@angular/core';
import { SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/Services/auth.service';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CasesComponent } from 'src/app/addinfo/components/cases/cases.component';
import { AppointmentComponent } from 'src/app/addinfo/components/appointment/appointment.component';
@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables-patient.component.html',
  styleUrls: ['./data-tables-patient.component.css']
})
export class DataTablesForPatientComponent implements OnInit {
  @Input() patientCount: any;

  selectionType = SelectionType.checkbox;
  selected: any = [];
  Cases:any = [];
  appointmentForm: any;
  selectedCaseAppointments:any = [];
  selectedCaseId:any;
  caseForm:any;

  checkIds: any = [];

  patients = [];


  constructor(private service: AuthService,private fb:FormBuilder,private dialog:MatDialog) {
    
  }
  ngOnInit(): void {
    this.initializePatients();
    this.initializeCaseForm();
    this.initializeAppointmentForm();
  }

  initializeCaseForm() {
    this.caseForm = this.fb.group({
      practiceLocation: ['', Validators.required],
      category: ['', Validators.required],
      purposeOfVisit: ['', Validators.required],
      caseType: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],

      doa: [''],
      insuranceName: ['', Validators.required],
      firmName: ['', Validators.required],
      firmCity: ['', Validators.required],
      firmState: ['', Validators.required],
      firmZipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]

    });
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



  initializePatients() {
    this.service.getAllPatient().subscribe((response: any) => {
      this.patients = response;
    }, (err: any) => {
      console.log(err);
    });
  }

  _onSelect({ selected }: any) {
    this.selected = selected
      .map((patient: any) => patient.user ? patient.user.id : null)
      .filter((id: any) => id !== null);
    console.log(this.selected);

    const selectedIds = selected
      .map((patient: any) => patient.user ? patient.user.id : null)
      .filter((id: any) => id !== null);

    selectedIds.forEach((id: number) => {
      const index = this.checkIds.indexOf(id);
      if (index > -1) {
        this.checkIds.splice(index, 1);
      } else {
        this.checkIds.push(id);
      }
    });
  }


  unselectAll() {
    this.selected = [];
  }


  deleteSelected() {
    console.log(this.checkIds);
    this.patients = this.patients.filter((patient: any) => !this.checkIds.includes(patient.user.id));
    console.log(this.selected);
    const stringWithComma = this.checkIds.join();
    console.log(stringWithComma);
    this.service.DeletePatient(stringWithComma).subscribe((response: any) => { });
    this.selected = [];
    this.checkIds = [];
  }

  viewPatient(patientId: number) {
    console.log('Viewing patient:', patientId);
  }
  viewCases(row:any)
  {
    this.service.getCasesforAdmin(row.patient_id).subscribe((response:any)=>{
      console.log(response);
      this.Cases = response;
    },(err)=>{
      console.log(err);
    });
  }

  view(case_id: any): void {
    console.log(case_id);
    if (case_id) {
      this.selectedCaseId = case_id;
      this.service.getAppointment(case_id).subscribe((response) => {
        console.log(response);
        this.selectedCaseAppointments = response;
      })
    } else {
      console.error('Case ID is undefined');
    }
  }

  editCase(Case: any): void {
    const dialogRef = this.dialog.open(CasesComponent, {
      panelClass: 'custom-dialog-container',
      height: 'auto',
      maxHeight: '80vh',
      width: '600px',
    });
    console.log("This is the case", Case);
    const caseDetails = {
      caseType: Case.case_type,
      category: Case.category,
      doa: Case.DOA,
      firmName: Case.firm_name,
      insuranceName: Case.insurance_name,
      practiceLocation: Case.practice_location_name,
      purposeOfVisit: Case.purpose_of_visit
    };
    console.log("Case Details", caseDetails);
    this.caseForm.patchValue(caseDetails);
    dialogRef.componentInstance.caseForm = this.caseForm;
    dialogRef.componentInstance.formSubmit.subscribe((formValues: any) => {
      this.onFormSubmitCaseForEdit(formValues, Case.id);
      dialogRef.close();
    });
  }

  onFormSubmitCaseForEdit(formValues: any, case_Id: number) {
    console.log("This is the form of the case", formValues);
    this.service.updateCase(formValues, case_Id).subscribe((response: any) => {
      console.log("This is the Response ", response);
      alert(response.message);
    }, (err: any) => {
      alert(err.error.message);
      console.log(err);
    });
  }

  addAppointment(case_id: any): void {
    console.log(case_id);
    const dialogRef = this.dialog.open(AppointmentComponent, {
      panelClass: 'custom-dialog-container',
      height: 'auto',
      maxHeight: '80vh',
      width: '600px',
    });
    dialogRef.componentInstance.appointmentForm = this.appointmentForm;
    dialogRef.componentInstance.formSubmit.subscribe((formValues: any) => {
      this.onFormSubmitAppointment(formValues, case_id);
      if (this.selectedCaseId) {
        this.service.getAppointment(this.selectedCaseId).subscribe((response) => {
          console.log(response);
          this.selectedCaseAppointments = response;
        })
      }
      else { console.error('Case ID is undefined'); }
      dialogRef.close();
    });
  }
  onFormSubmitAppointment(formData: any, case_Id: number) {
    console.log("This is the Form Values", formData);
    const case_id = case_Id;
    const dataToSubmit = { ...formData, case_id };
    this.service.addAppointment(dataToSubmit).subscribe((response) => {
      alert(response.message);
    }, (err) => {
      alert(err.error.message);
    })
  }
  editAppointment(appointment: any) {
    const data = {
      date: appointment.date,
      time: appointment.appointment_time,
      appointmentType: appointment.appointment_type,
      speciality: appointment.speciality_name,
      doctor: appointment.doctor_name,
      location: appointment.practice_location_name,
      duration: appointment.Duration,
      description: appointment.Description
    }
    console.log(appointment);
    const dialogRef = this.dialog.open(AppointmentComponent, {
      panelClass: 'custom-dialog-container',
      height: 'auto',
      maxHeight: '80vh',
      width: '600px',
    });
    this.appointmentForm.patchValue(data);
    console.log(appointment);
    dialogRef.componentInstance.appointmentForm = this.appointmentForm;
    dialogRef.componentInstance.formSubmit.subscribe((formValues: any) => {
      this.onFormSubmitAppointmentEdit(formValues, appointment.id);
      if (this.selectedCaseId) {
        this.service.getAppointment(this.selectedCaseId).subscribe((response) => {
          console.log(response);
          this.selectedCaseAppointments = response;
        })
      } else {
        console.error('Case ID is undefined');
      }
      dialogRef.close();
    });
  }
  onFormSubmitAppointmentEdit(formvalues: any, appointment_id: number) {
    console.log("This is the Form Values", formvalues, appointment_id);
    this.service.updateAppointment(formvalues, appointment_id).subscribe((response: any) => {
      alert(response.message);
    }, (err: any) => {
      alert(err.error.message);
    });
  }
}