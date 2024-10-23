import { Component, OnInit } from '@angular/core';
import { Validators,FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointmentForm: FormGroup;
  cases = ['Case 1', 'Case 2', 'Case 3']; // Example case data
  appointmentTypes = ['Consultation', 'Follow-up', 'Emergency']; // Example appointment types
  specialities = ['Cardiology', 'Dermatology', 'Neurology']; // Example specialities
  doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams']; // Example doctors
  locations = ['Clinic A', 'Clinic B', 'Clinic C']; // Example practice locations

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      selectedCase: ['', Validators.required],
      date: ['', Validators.required], // Date field
      time: ['', Validators.required], // Time field
      appointmentType: ['', Validators.required],
      speciality: ['', Validators.required],
      doctor: ['', Validators.required],
      location: ['', Validators.required],
      duration: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Duration must be a number
      description: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const { date, time, ...rest } = this.appointmentForm.value;
      console.log({
        ...rest,
        date: date ? date.toISOString().split('T')[0] : '', // Return only the date part
        time // Keep time as is
      });
      // Handle form submission (e.g., send data to the backend)
    }
  }
}
