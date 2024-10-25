import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  caseForm: any = FormGroup;
  practiceLocations: any;
  categories: any;

  purposes: any;

  caseTypes: any;
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

  firmNames: any;

  constructor(private fb: FormBuilder, private service: AuthService) { }

  ngOnInit(): void {
    this.createForm();
    this.initailizePracticeLocation();
    this.initalizeCategory();
    this.initailizePurposeOfVisit();
    this.initializeCaseType();
    this.initializeFirm();
  }


  initailizePracticeLocation(): void {
    this.service.getPracticeLocation().subscribe((result) => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.practiceLocations = data;
      console.log(data);
    }, err => { });
  }


  initalizeCategory(): void {
    this.service.getCategory().subscribe(result => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.categories = data;
    });
  }

  initailizePurposeOfVisit(): void {
    this.service.getPurpose().subscribe(result => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.purposes = data;
      console.log(this.purposes);

    })
  }

  initializeCaseType(): void {
    this.service.getCaseType().subscribe((result) => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.caseTypes = data;
    });
  }
  initializeFirm(): void {
    this.service.getFirm().subscribe((result) => {
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      });
      this.firmNames = data;
    });
  }
  onChangeFirm(firm: string): void {
    this.service.getInsurance(firm).subscribe((result) => {
      console.log(result);
      let data = result;
      data = data.map((e: any) => {
        return e.name;
      })
      this.insuranceNames = data;
    })
  }

  createForm() {
    this.caseForm = this.fb.group({
      practiceLocation: ['', Validators.required],
      category: ['', Validators.required],
      purposeOfVisit: ['', Validators.required],
      caseType: ['', Validators.required],
      doa: [''],

      insuranceName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]], // Zip code pattern for 5 digits

      firmName: ['', Validators.required],
      firmCity: ['', Validators.required],
      firmState: ['', Validators.required],
      firmZipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]] // 5-digit zip code
    });
  }


  onSubmit() {
    if (this.caseForm.valid) {

      const formValues = this.caseForm.value;
      if (formValues.doa) {
        const formattedDoa = new Date(formValues.doa).toISOString().split('T')[0];
        this.caseForm.patchValue({ doa: formattedDoa });
      }

      const formData = this.caseForm.value;
      console.log('Form Data:', formData);
      this.service.submitCase(formData).subscribe(result => { }, err => { });
    } else {
      console.log('Form is invalid!');
    }
  }

}
