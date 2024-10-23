import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: PageComponent },
  { path: 'home/signup', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  {
    path: 'patient',
    loadChildren: () => import('./addinfo/addinfo.module').then(m => m.AddinfoModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'patient', 'guest'] },
  },
  { path: 'home/signin', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
