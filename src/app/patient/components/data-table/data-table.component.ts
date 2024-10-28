import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { AppointmentComponent } from 'src/app/addinfo/components/appointment/appointment.component';
import { MatDialog } from '@angular/material/dialog';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(private Service: AuthService, private dialog: MatDialog, private fb: FormBuilder) { }
  ngOnInit() {
    this.initializeCases();
    console.log(this.filteredCases);
    this.initializeAppointmentForm();
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
  addAppointment(case_id: any): void {
    const dialogRef = this.dialog.open(AppointmentComponent, {
      panelClass: 'custom-dialog-container', // Optional: Add a custom class for more styles
      height: 'auto', // or a fixed height, e.g., '400px'
      maxHeight: '80vh', // Set a maximum height relative to the viewport height
      width: '600px', // Set a width for your dialog
    });
    dialogRef.componentInstance.appointmentForm = this.appointmentForm;
    dialogRef.componentInstance.formSubmit.subscribe((formValues: any) => {
      this.onFormSubmitAppointment(formValues, case_id);
      dialogRef.close();
    });
  }
  onFormSubmitAppointment(formData: any, case_Id: number) {
    console.log("This is the Form Values", formData);
    const case_id = case_Id;
    const dataToSubmit = { ...formData, case_id };
    this.Service.addAppointment(dataToSubmit).subscribe((response) => {
      alert(response.message);
    })
  }

  editAppointment(appointment_id: number) {
    console.log(appointment_id);
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
