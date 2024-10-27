import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isActive = false;
  constructor() { }
  ngOnInit(): void {
  }
  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('sidebarToggle');
    if (this.isActive && sidebar && !sidebar.contains(event.target as Node) && toggleButton && !toggleButton.contains(event.target as Node)) {
      this.isActive = false;
    }
  }
  toggleSidebar() {
    this.isActive = !this.isActive;
  }
}