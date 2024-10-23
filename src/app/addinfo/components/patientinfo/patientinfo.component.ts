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

  states: any = [
    {
      "id": 1,
      "name": "California",
      "deleted_at": null
    },
    {
      "id": 2,
      "name": "Texas",
      "deleted_at": null
    },
    {
      "id": 3,
      "name": "New York",
      "deleted_at": null
    },
    {
      "id": 4,
      "name": "Florida",
      "deleted_at": null
    },
    {
      "id": 5,
      "name": "Illinois",
      "deleted_at": null
    }
  ];
  cities: string[] = [];

  constructor(private fb: FormBuilder, private service: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();

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
  }

  onStateChange(state: string) {
    console.log(state);
    //now on the bases of the state.id i will call the the get cities api and set them
    if (state === 'California') {
      this.cities = ['Los Angeles', 'San Francisco'];
    } else if (state === 'Texas') {
      this.cities = ['Houston', 'Dallas'];
    }
    this.patientForm.get('city').setValue(''); // Reset city selection on state change
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
      this.formSubmitted.emit(response);
    }, err => {
      alert(err.error.message);
      console.log(err);
    });
  }
}
