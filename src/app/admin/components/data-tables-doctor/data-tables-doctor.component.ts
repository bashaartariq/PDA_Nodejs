import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-data-tables-doctor',
  templateUrl: './data-tables-doctor.component.html',
  styleUrls: ['./data-tables-doctor.component.css']
})
export class DataTablesDoctorComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  selectDateRange() {

  }
}
