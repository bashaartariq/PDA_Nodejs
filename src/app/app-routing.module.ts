import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'patient', loadChildren: () => import('./addinfo/addinfo.module').then(m => m.AddinfoModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
