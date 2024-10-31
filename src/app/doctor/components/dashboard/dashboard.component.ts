import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalAppointments = 0;
  selectedCaseAppointments:any = [];
  constructor(private service:AuthService) { }
  ngOnInit(): void {
    this.getAppointments();
  }
  getAppointments():void
  {
    const user_id = this.service.decodeToken()?.userId;
    if(user_id)
    {
      this.service.getDoctorAppointment(user_id).subscribe((response)=>{
        this.selectedCaseAppointments = response[0].appointment;
        this.totalAppointments = this.selectedCaseAppointments.length;
        console.log(this.selectedCaseAppointments);
      },(err)=>{});
    }
  }


}
