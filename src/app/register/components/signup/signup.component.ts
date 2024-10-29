import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { DialogService } from 'src/app/Services/dialog.service';

interface speciality {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
interface PracticeLocation {
  id: number;
  name: string;
  created_at: string; // or Date if you want to handle it as a date object
  updated_at: string; // or Date
  deleted_at: string | null; // can be null if not set
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: any = FormGroup;
  doctorForm: any = FormGroup;
  roles: string[] = ['patient', 'doctor'];
  genders: string[] = ['male', 'female', 'other'];
  isDoctor: boolean = false;
  speciality: speciality[] = [];
  practiceLocation: PracticeLocation[] = [];


  constructor(private fb: FormBuilder,
    private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.initializeForm();
  }

  onRoleChange(selectedRole: string): void {
    this.isDoctor = selectedRole === 'doctor';
    this.initializeDoctorForm();
    this.getSpecialityandPracticeLocation();
  }

  getSpecialityandPracticeLocation() {
    this.authService.getSpecailiy().subscribe((result) => {
      this.speciality = result;
    });
    this.authService.getPracticeLocation().subscribe((result) => {
      this.practiceLocation = result;
    });
  }



  initializeDoctorForm(): void {
    this.doctorForm = this.fb.group({
      practicelocation: ['', [Validators.required]],
      speciality: ['', [Validators.required]]
    });

  }


  initializeForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      role: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    },
      { validators: this.passwordMatchValidator });
    this.signupForm.patchValue();
  }

  passwordMatchValidator(group: FormGroup) {

    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { mismatch: true };

  }
  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      const formValues = this.signupForm.value;
      if (formValues.dob) {
        const formattedDob = new Date(formValues.dob).toISOString().split('T')[0];
        this.signupForm.patchValue({ dob: formattedDob });
      }

      this.authService.signup(this.signupForm.value).subscribe(result => {
        localStorage.setItem('token', result.token);
        this.authService.user = result.user;
        console.log(this.authService);
        if (this.signupForm.get('role')?.value == 'doctor') {
          const formData = {
            ...this.doctorForm.value,
            userId: this.authService.decodeToken()?.userId
          };
          alert(result.message);
          console.log(formData);
          this.authService.createDoctor(formData).subscribe((result: any) => {
          });
        }

        if(this.authService.decodeToken()?.role === 'patient')
        {
          this.router.navigate(['patient/add']);
        }
        else if(this.authService.decodeToken()?.role === 'doctor')
        {
          this.router.navigate(['app/doctor/dashboard']);
        }
      }, err => {
        //console.log(err);
        alert(err.error.message);
      });
    }

  }

  isButtonDisabled(): boolean {
    if (this.signupForm.get('role')?.value === 'doctor') {
      return this.signupForm.invalid || this.doctorForm.invalid;
    }
    return this.signupForm.invalid;
  }


}