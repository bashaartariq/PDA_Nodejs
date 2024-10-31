import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CasesComponent } from 'src/app/addinfo/components/cases/cases.component';
import { Validators, FormGroup,FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {
  selectedCaseAppointments: any = [];
  selectAppointmentCase:any = [];
  constructor(private service:AuthService,private dialog: MatDialog,private fb:FormBuilder) { }
  ngOnInit(): void {
    this.getAppointments();
  }
  viewCases(row:any){
    this.service.getAppointmentCase(row.id).subscribe((result)=>{
      console.log(result);
      this.selectAppointmentCase = [result];
    },(err)=>{
      console.log(err);
    });
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
  editAppointment(row:any)
  {
    console.log(row);
  }}