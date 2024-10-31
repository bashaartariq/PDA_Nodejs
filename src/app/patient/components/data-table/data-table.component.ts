import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AppointmentComponent } from 'src/app/addinfo/components/appointment/appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators,FormBuilder } from '@angular/forms';
import { CasesComponent } from 'src/app/addinfo/components/cases/cases.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  patientCases: any[] = [];
  pages: number[] = [1, 2, 3, 4, 5, 6];
  page: number = 0;
  pageSize: number = 5;
  searchTerm: string = '';
  filteredCases: any[] = [];
  selectedCaseAppointments: any[] = [];
  selectedCaseId: number | null = null;
  appointmentForm: any;
  caseForm:any;
  constructor(private Service: AuthService, private dialog: MatDialog, private fb: FormBuilder) { }
  ngOnInit(){
    this.initializeCases();
    console.log(this.filteredCases);
    this.initializeAppointmentForm();
    this.initializeCaseForm();
  }
  initializeCases(): void {
    this.Service.getCases().subscribe((response) => {
      this.patientCases = response;
      console.log(this.patientCases);
      this.filteredCases = [...this.patientCases];
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

  initializeCaseForm() {
    this.caseForm = this.fb.group({
      practiceLocation: ['', Validators.required],
      category: ['', Validators.required],
      purposeOfVisit: ['', Validators.required],
      caseType: ['', Validators.required],
      doa: [''],

      insuranceName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],

      firmName: ['', Validators.required],
      firmCity: ['', Validators.required],
      firmState: ['', Validators.required],
      firmZipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }
  view(case_id: any): void {
    console.log(case_id);
    if (case_id) {
      this.selectedCaseId = case_id;
      this.Service.getAppointment(case_id).subscribe((response) => {
        console.log(response);
        this.selectedCaseAppointments = response;
      })
    } else {
      console.error('Case ID is undefined');
    }
  }
  editCase(Case:any):void
  {
    const dialogRef = this.dialog.open(CasesComponent, {
      panelClass: 'custom-dialog-container',
      height: 'auto',
      maxHeight: '80vh',
      width: '600px',
    });
    console.log("This is the case",Case);
    const caseDetails = {
      caseType: Case.case_type,
      category: Case.category,
      doa:Case.DOA,
      firmName: Case.firm_name,
      insuranceName: Case.insurance_name,
      practiceLocation: Case.practice_location_name,
      purposeOfVisit: Case.purpose_of_visit
  };
  console.log("Case Details",caseDetails);
    this.caseForm.patchValue(caseDetails);
    dialogRef.componentInstance.caseForm = this.caseForm;
    dialogRef.componentInstance.formSubmit.subscribe((formValues:any)=>{
      this.onFormSubmitCaseForEdit(formValues,Case.id);
      this.initializeCases();
      dialogRef.close();
    });
  }
  onFormSubmitCaseForEdit(formValues:any,case_Id:number)
  {
    console.log("This is the form of the case",formValues);
    this.Service.updateCase(formValues,case_Id).subscribe((response:any)=>{
      console.log("This is the Response ",response);
    },(err:any)=>{console.log("This is the Error while updating the case",err);});
  }
  addAppointment(case_id: any): void {
    const dialogRef = this.dialog.open(AppointmentComponent, {
      panelClass: 'custom-dialog-container',
      height: 'auto',
      maxHeight: '80vh',
      width: '600px',
    });
    dialogRef.componentInstance.appointmentForm = this.appointmentForm;
    dialogRef.componentInstance.formSubmit.subscribe((formValues: any) => {
      this.onFormSubmitAppointment(formValues, case_id);
        if(this.selectedCaseId){
          this.Service.getAppointment(this.selectedCaseId).subscribe((response) => {
            console.log(response);
            this.selectedCaseAppointments = response;
          })}
        else 
          {console.error('Case ID is undefined');}   
      dialogRef.close();
    });
  }
  onFormSubmitAppointment(formData: any, case_Id: number) {
    console.log("This is the Form Values", formData);
    const case_id = case_Id;
    const dataToSubmit = { ...formData, case_id };
    this.Service.addAppointment(dataToSubmit).subscribe((response) => {
      alert(response.message);
    },(err)=>{
      alert(err.error.message);
    })
  }
  editAppointment(appointment: any) {
   const data = { date: appointment.date,
    time:appointment.appointment_time ,
    appointmentType:appointment.appointment_type ,
    speciality: appointment.speciality_name,
    doctor:appointment.doctor_name,
    location: appointment.practice_location_name,
    duration:appointment.Duration ,
    description:appointment.Description
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
      this.onFormSubmitAppointmentEdit(formValues,appointment.id);
      if(this.selectedCaseId)
      {
        this.Service.getAppointment(this.selectedCaseId).subscribe((response) => {
          console.log(response);
          this.selectedCaseAppointments = response;
        })
      } else {
        console.error('Case ID is undefined');
      } 
      dialogRef.close();
    });
  }
  onFormSubmitAppointmentEdit(formvalues:any,appointment_id:number){
    console.log("This is the Form Values",formvalues,appointment_id);
    this.Service.updateAppointment(formvalues,appointment_id).subscribe((response:any)=>{
      alert(response.message);
    },(err:any)=>{
      alert(err.error.message);
    });
  }
  filterCases() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCases = this.patientCases.filter((caseItem: any) =>
      caseItem.category.toLowerCase().includes(term) ||
      caseItem.purpose_of_visit.toLowerCase().includes(term) ||
      caseItem.case_type.toLowerCase().includes(term) ||
      caseItem.insurance_name.toLowerCase().includes(term) ||
      caseItem.firm_name.toLowerCase().includes(term) ||
      caseItem.practice_location_name.toLowerCase().includes(term)
    );
    this.page = 0;
  }
  onPage(event: any) {
    this.page = event.offset;
  }
  setPage(page: number) {
    this.page = page;
  }
  nextPage() {
    if (this.page < this.filteredCases.length / this.pageSize - 1) {
      this.page++;
    }
  }
  previousPage() {
    if (this.page > 0) {
      this.page--;
    }
  }
}