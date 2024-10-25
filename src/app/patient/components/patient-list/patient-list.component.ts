import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  isActive = false;
  constructor() { }

  ngOnInit(): void {
  }


  // Listen for clicks on the document
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('sidebarToggle');

    // Check if the click was outside the sidebar and toggle button
    if (this.isActive && sidebar && !sidebar.contains(event.target as Node) && toggleButton && !toggleButton.contains(event.target as Node)) {
      this.isActive = false; // Collapse the sidebar
    }
  }
 

  toggleSidebar() {
      this.isActive = !this.isActive; // Toggle the active class
  }
}
