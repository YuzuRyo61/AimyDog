import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent,
    }]),
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class DashboardModule { }
