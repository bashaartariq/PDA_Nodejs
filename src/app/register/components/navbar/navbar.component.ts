import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/Services/dialog.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog:DialogService,private route:Router) { }

  ngOnInit(): void {
  }
  login()
  {
    this.dialog.openDialog(LoginComponent);
  }
  signup()
  {
    this.dialog.openDialog(SignupComponent);
  }
}
