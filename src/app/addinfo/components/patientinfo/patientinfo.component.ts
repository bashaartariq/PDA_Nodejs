import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.css']
})
export class PatientinfoComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  patientForm: any = FormGroup;
  states: any;
  cities: string[] = [];
  patient: any;
  constructor(private fb: FormBuilder, private service: AuthService) { }
  ngOnInit(): void {
    this.initializeForm();
    this.initailizeStates();
  }
  initailizeStates(): void {
    this.service.getStates().subscribe((result) => {
      console.log(result);
      this.states = result;
    }, (err) => { });
  }

  initializeForm(): void {
    this.patientForm = this.fb.group({
      ssn: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)]],
      homePhone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      cellPhone: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
    });
    this.service.getPatientInfo().subscribe((response) => {
      const patientData = {
        ssn: response.data?.ssn || '',
        homePhone: response.data?.home_phone || '',
        cellPhone: response.data?.cell_phone || '',
        address: response.data?.address || '',
        state: response.data?.state || '',
        city: response.data?.city || '',
        zip: response.data?.zip || ''
      };

      this.patientForm.patchValue(patientData);
      console.log(patientData);
    })
    const token = localStorage.getItem('token');
    if (token) {
      this.patientForm.patchValue(this.service.patient);
    }



  }
  onStateChange(state: string) {
    console.log("Working on state change");
    console.log(state);
    this.service.getCity(state).subscribe((result) => {
      const data = result;
      console.log(data);
      this.cities = data.map((e: any) => {
        return e.name;
      });
    }, (err) => { })
    this.patientForm.get('city').setValue('');
  }
  onSubmit() {
    if (this.patientForm.valid) {
      console.log('Form Submitted!', this.patientForm.value);
    }
    console.log(this.service.decodeToken());
    const formData = {
      ...this.patientForm.value,
      user_id: this.service.decodeToken()?.userId
    };
    //console.log(formData);
    this.service.addInfo(formData).subscribe(response => {
      alert(response.message);
      console.log(response);
      this.service.patient = this.patientForm.value;
      console.log(this.service.patient);
      this.formSubmitted.emit(response);
    }, err => {
      alert(err.error.message);
      console.log(err);
    });
  }
}
