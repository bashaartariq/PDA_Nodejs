import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepperComponent } from './components/stepper/stepper.component';

const routes: Routes = [
  { path:'add',component:StepperComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddinfoRoutingModule { }
