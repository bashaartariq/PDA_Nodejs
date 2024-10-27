import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { speciality, PracticeLocation } from 'src/app/model/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  signupForm: any = FormGroup;
  doctorForm: any = FormGroup;
  roles: string[] = ['patient', 'doctor'];
  genders: string[] = ['male', 'female', 'other'];
  isDoctor: boolean = false;
  speciality: speciality[] = [];
  practiceLocation: PracticeLocation[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
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
        //console.log(result);
        if (this.signupForm.get('role')?.value === 'doctor') {
          const formData = {
            ...this.doctorForm.value,
            userId: this.authService.decodeToken()?.userId
          };

          console.log(formData);
          this.authService.createDoctor(formData).subscribe((result: any) => {
          });
        }
        alert(result.message);
        localStorage.setItem('token', result.token);
        this.authService.user = result.user;
        console.log(this.authService);
        this.router.navigate(['patient/add']);
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
