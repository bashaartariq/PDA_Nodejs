import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { DataTablesComponent } from './components/data-tables/data-tables.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    DataTablesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule
  ]
})

export class AdminModule { }