import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  totalDoctors:number= 0;
  totalPatients:number = 0;
  constructor(private Service:AuthService) { }
  ngOnInit(): void {
    this.getDoctorandPatientCount();
  }
  getDoctorandPatientCount()
  {
    this.Service.getTotalDoctorandPatient().subscribe((response:any)=>{
      this.totalDoctors = response.doctorCount;
      this.totalPatients = response.patientCount;
    },(err)=>{
      this.totalDoctors = 0;
      this.totalDoctors = 0;
    });
  }
}
