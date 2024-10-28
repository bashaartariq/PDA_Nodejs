import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;
  appointmentForm: any;
  case_Id: number = 0;


  caseForm: any;

  constructor(private route: Router, private fb: FormBuilder, private Service: AuthService) {
    this.initializeAppointmentForm();
    this.initializeCaseForm();
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


  onFormSubmitCase(formData: any): void {
    console.log('Form submitted from stepper:', formData);
    this.Service.submitCase(formData).subscribe((response) => {
      console.log(response);
      this.case_Id = response.case_Id;
      alert(response.message);
    });
    this.stepper.next();
  }
  onFormSubmitAppointment(formData: any) {
    console.log('From Stepper:', formData);
    const case_id = this.case_Id;
    const dataToSubmit = { ...formData, case_id };

    this.Service.addAppointment(dataToSubmit).subscribe((response) => {
      alert(response);
    })
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
  ngOnInit(): void {
  }

  goToNextStep(event: any) {
    this.stepper.next();
  }

  onSubmit() {
    this.route.navigate(['app/patient/list']);
    console.log("HELLO");
  }

}