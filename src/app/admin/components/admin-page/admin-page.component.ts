import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Observable, Observer } from 'rxjs';
import { DataTablesForPatientComponent } from '../data-tables-patient/data-tables-patient.component';
import { DataTablesDoctorComponent } from '../data-tables-doctor/data-tables-doctor.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  totalDoctors: number = 0;
  totalPatients: number = 0;
  asyncTabs: Observable<any>;

  constructor(private Service: AuthService) {
    this.asyncTabs = new Observable((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next([
          { label: 'Patient', component: DataTablesForPatientComponent },
          { label: 'Doctor', component: DataTablesDoctorComponent },
        ]);
      }, 1000);
    });

  }
  ngOnInit(): void {
    this.getDoctorandPatientCount();
  }
  getDoctorandPatientCount() {
    this.Service.getTotalDoctorandPatient().subscribe((response: any) => {
      this.totalDoctors = response.doctorCount;
      this.totalPatients = response.patientCount;
    }, (err) => {
      this.totalDoctors = 0;
      this.totalDoctors = 0;
    });
  }
}
