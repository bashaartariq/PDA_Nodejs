import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  signin$:Observable<boolean>;
  constructor(private route: Router, private service: AuthService, ) {
    this.signin$ = this.service.signin$;
   }
  ngOnInit(): void {
    this.signinTrue();
  }

  signinTrue(): void {
    const loggedIn = localStorage.getItem('token') ? true : false;
    }

  navigateto() {
    const role = this.service.decodeToken()?.role;
    if (role === 'patient') {
      this.route.navigate(['/app/patient/list']);
    }
    else if(role === 'doctor') {
      this.route.navigate(['/app/doctor/dashboard']);
    }
  }
  logout(): void {
    localStorage.clear();
    this.service.logout();
    this.signin$ = this.service.signin$;
    this.route.navigate(['/home']);
  }
}
