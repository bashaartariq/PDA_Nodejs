import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  caseForm: any = FormGroup;

  practiceLocations = ['Location 1', 'Location 2', 'Location 3'];
  categories = ['Category 1', 'Category 2', 'Category 3'];
  purposes = ['Purpose 1', 'Purpose 2', 'Purpose 3'];
  caseTypes = ['Type 1', 'Type 2', 'Type 3'];
  insuranceNames = ['Insurance 1', 'Insurance 2', 'Insurance 3'];
  cities = ['City 1', 'City 2', 'City 3'];
  states = ['State 1', 'State 2', 'State 3'];
  firmNames = ['Firm 1', 'Firm 2', 'Firm 3'];

  constructor(private fb: FormBuilder) {}

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
