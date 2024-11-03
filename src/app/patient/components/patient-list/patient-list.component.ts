import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  name: string = "";
  email: string = "";
  role: string = "";
  DOB_data: string = "";

  constructor(private dialog: DialogService, private Service: AuthService) { }
  ngOnInit(): void {
    this.inititalizeUserInfo();
  }
  inititalizeUserInfo(): void {
    this.name = this.Service.decodeToken()?.firstName || "";
    this.email = this.Service.decodeToken()?.email || "";
    this.role = this.Service.decodeToken()?.role || "";
    this.DOB_data = this.Service.decodeToken()?.dob;
    console.log("DATA", this.Service.decodeToken());
  }
  EditProfile(): void {
    this.dialog.openDialog(EditProfileComponent);
  }
}