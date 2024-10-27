import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/Services/dialog.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  signin: boolean = true;
  constructor(private dialog: DialogService, private route: Router, private service: AuthService) { }
  ngOnInit(): void {
  }

  signinTrue(): void {
    this.signin = localStorage.getItem('token') ? true : false;
  }

  navigateto() {
    const token = localStorage.getItem('token');
    if (token) {
      this.route.navigate(['/app/patient/list']);
    }
    else {
      this.route.navigate(['/home']);
    }
  }
  logout(): void {
    this.signin = false;
    localStorage.clear();
    this.route.navigate(['/home']);

  }
}
