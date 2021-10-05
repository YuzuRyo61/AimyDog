import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from "./reports.component";
import { RouterModule } from "@angular/router";
import { ReportCardModule } from "../../components/report-card/report-card.module";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ReportSearchDialogComponent } from './report-search-dialog/report-search-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";



@NgModule({
  declarations: [
    ReportsComponent,
    ReportSearchDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ReportsComponent,
    }]),
    ReportCardModule,
    VirtualScrollerModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class ReportsModule { }
