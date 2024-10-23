import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/Services/dialog.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dialog: DialogService, private route: Router) { }

  ngOnInit(): void {
  }
}
