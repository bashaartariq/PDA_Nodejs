import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageComponent } from './components/page/page.component';

const routes: Routes = [{ path: '', component: LandingComponent
  ,children:[
    {
      path:'app',component:PageComponent
    },
    {
      path:'login',component:LoginComponent
    },
    { path:'signup',component:SignupComponent  }
  ]
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }