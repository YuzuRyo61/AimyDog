import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from "./reports.component";
import { RouterModule } from "@angular/router";
import { ReportCardModule } from "../../components/report-card/report-card.module";



@NgModule({
  declarations: [
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ReportsComponent,
    }]),
    ReportCardModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class ReportsModule { }
