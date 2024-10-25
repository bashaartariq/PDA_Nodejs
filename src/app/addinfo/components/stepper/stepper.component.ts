import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent implements OnInit {
  @ViewChild('stepper') private stepper!: MatStepper;
  constructor(private route:Router) { }
  goToNextStep(event: any) {
    // Navigate to the next step
    this.stepper.next();
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.route.navigate(['app/patient/list']);
    console.log("HELLO");
  }

}