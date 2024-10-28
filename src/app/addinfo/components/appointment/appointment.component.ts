import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Case, AppointmentType, speciality, PracticeLocation, Doctor } from 'src/app/model/interfaces';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  @Input() appointmentForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<any>();

  cases: Case[] = [];
  appointmentTypes: AppointmentType[] = [];
  specialities: speciality[] = [];
  doctors: Doctor[] = [];
  locations: PracticeLocation[] = [];

  constructor(private fb: FormBuilder, private Service: AuthService) { }

  fetchDoctor(): void {
    const specialityId = this.appointmentForm.get('speciality')?.value;
    const locationId = this.appointmentForm.get('location')?.value;

    if (specialityId && locationId) {
      this.Service.getDoctorByPracticeLocationAndSpeciality(locationId, specialityId).subscribe(
        (response) => {
          this.doctors = response;
        },
        (error) => {
          console.error('Error fetching doctors:', error);
          this.doctors = [];
        }
      );
    }
  }

  ngOnInit(): void {
    this.initializeAppointmentType();
    this.getSpecialityandPracticeLocation();
    this.appointmentForm.get('speciality')?.valueChanges.subscribe(() => this.fetchDoctor());
    this.appointmentForm.get('location')?.valueChanges.subscribe(() => this.fetchDoctor());
  }
  getSpecialityandPracticeLocation() {
    this.Service.getSpecailiy().subscribe((result) => {
      this.specialities = result;
    });
    this.Service.getPracticeLocation().subscribe((result) => {
      this.locations = result;
    });
  }

  initializeAppointmentType() {
    this.Service.getAppointmentsType().subscribe((response) => {
      this.appointmentTypes = response;
    }, (err) => {
      alert(err.error.message);
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const formValues = this.appointmentForm.value;
      if (formValues.date) {
        const formattedDoa = new Date(formValues.date).toISOString().split('T')[0];
        this.appointmentForm.patchValue({ date: formattedDoa });
      }
      console.log(this.appointmentForm.value);
      this.formSubmit.emit(this.appointmentForm.value);
    }
  }
}