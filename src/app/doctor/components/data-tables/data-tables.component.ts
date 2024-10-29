import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {
  selectedCaseAppointments: any = [];

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
        console.log(this.selectedCaseAppointments);
      },(err)=>{});
    }
  }
}
