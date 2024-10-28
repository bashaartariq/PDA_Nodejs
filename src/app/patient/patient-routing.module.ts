import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './components/patient-list/patient-list.component';
const routes: Routes = [
  { path: 'patient/list', component: PatientListComponent },

  {
    path: 'patient',
    loadChildren: () => import('../addinfo/addinfo.module').then(m => m.AddinfoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
