import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  caseForm: any = FormGroup;

  practiceLocations = [
    'Downtown Medical Center',
    'Northside Family Clinic',
    'Westview Health Services',
    'Sunrise Community Health',
    'Riverbend Urgent Care'
  ];

  categories = [
    'General Medicine',
    'Pediatrics',
    'Dermatology',
    'Orthopedics',
    'Cardiology'
  ];

  purposes = [
    'Routine Checkup',
    'Follow-up Appointment',
    'Emergency Care',
    'Specialist Referral',
    'Lab Tests'
  ];

  caseTypes = [
    'New Patient',
    'Follow-up Visit',
    'Urgent Care',
    'Telehealth Consultation',
    'Preventive Care'
  ];

  insuranceNames = [
    'Aetna',
    'Blue Cross Blue Shield',
    'Cigna',
    'UnitedHealthcare',
    'Humana'
  ];

  cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix'
  ];

  states = [
    'NY - New York',
    'CA - California',
    'IL - Illinois',
    'TX - Texas',
    'AZ - Arizona'
  ];

  firmNames = [
    'Smith & Associates',
    'Johnson Healthcare Group',
    'Pinnacle Health Partners',
    'Carewell Medical Group',
    'Wellness Solutions Inc.'
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.caseForm = this.fb.group({
      practiceLocation: ['', Validators.required],
      category: ['', Validators.required],
      purposeOfVisit: ['', Validators.required],
      caseType: ['', Validators.required],
      doa: [''], // Optional Date of Accident

      // Insurance Information
      insuranceName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]], // Zip code pattern for 5 digits
      insuranceCellNo: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // 11-digit phone number

      // Firm Information
      firmName: ['', Validators.required],
      firmCity: ['', Validators.required],
      firmState: ['', Validators.required],
      firmZipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]] // 5-digit zip code
    });
  }

  // Submit method to handle form submission
  onSubmit() {
    if (this.caseForm.valid) {
      const formData = this.caseForm.value;
      console.log('Form Data:', formData);
      // Handle the form data here
    } else {
      console.log('Form is invalid!');
    }
  }

}
